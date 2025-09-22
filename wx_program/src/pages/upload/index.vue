<template>
  <view class="container">
    <!-- Header -->
    <view class="header">
      <u-navbar 
        :title="getPageTitle()"
        left-icon="arrow-left"
        @left-click="handleBack"
      />
    </view>

    <!-- Category Display -->
    <view class="category-display">
      <view class="category-info">
        <text class="category-name">{{ getCurrentCategoryName() }}</text>
        <text v-if="selectedGender && currentCategory !== PhotoCategory.WECHAT_PORTRAIT" class="gender-info">
          {{ getGenderName() }}
        </text>
      </view>
    </view>

    <!-- Sample Images -->
    <view class="samples-section">
      <view class="section-title">
        <view class="title-indicator"></view>
        <text class="title-text">样片</text>
      </view>
      
      <!-- WeChat Portrait Layout -->
      <view v-if="currentCategory === PhotoCategory.WECHAT_PORTRAIT" class="wechat-preview">
        <view class="wechat-composition">
          <!-- Selected Frame -->
          <view class="frame-container">
            <image :src="selectedWechatFrame" class="frame-image" mode="aspectFill" />
          </view>
          
          <text class="plus-icon">+</text>
          
          <!-- User Avatar Placeholder -->
          <view class="avatar-placeholder">
            <text class="placeholder-text">您的<br/>微信头像</text>
          </view>
        </view>
      </view>
      
      <!-- Other Categories Layout -->
      <view v-else class="normal-samples">
        <view class="samples-grid">
          <view 
            v-for="(sample, index) in sampleImages" 
            :key="index"
            class="sample-item"
            @tap="handleSampleClick(sample)"
          >
            <image :src="sample" class="sample-image" mode="aspectFill" />
          </view>
        </view>
      </view>
    </view>

    <!-- Upload Section -->
    <view class="upload-section">
      <view v-if="currentCategory === PhotoCategory.WECHAT_PORTRAIT" class="wechat-actions">
        <!-- Main Action Button -->
        <u-button 
          type="primary"
          size="large"
          shape="round"
          :custom-style="{ width: '100%', marginBottom: '20rpx' }"
          @click="handleOneClickGeneration"
        >
          一键做同款
        </u-button>
        
        <!-- Alternative Upload Option -->
        <view class="alternative-option">
          <text class="or-text">或者</text>
          <u-button 
            type="info"
            size="normal"
            plain
            @click="handleManualUpload"
          >
            点击上传/拍照
          </u-button>
        </view>
        
        <!-- Generate Button - Show when file is selected -->
        <u-button 
          v-if="selectedFile"
          type="primary"
          size="large"
          shape="round"
          :custom-style="{ width: '100%', marginTop: '20rpx' }"
          :loading="isUploading"
          @click="handleGenerate"
        >
          开始生成我的头像（4张）
        </u-button>
      </view>
      
      <!-- Normal Upload for other categories -->
      <view v-else class="normal-upload">
        <view class="section-title">
          <view class="title-indicator"></view>
          <text class="title-text">上传照片</text>
        </view>
        
        <view class="upload-area">
          <!-- Photo Display Area -->
          <view class="photo-display" @tap="handleUploadClick">
            <view class="photo-container" :class="{ 'id-photo': isIdPhoto }">
              <image 
                v-if="uploadedImageUrl"
                :src="uploadedImageUrl"
                class="uploaded-image"
                mode="aspectFill"
              />
              <view v-else class="upload-placeholder">
                <image 
                  v-if="!isIdPhoto"
                  :src="outlineHuman"
                  class="outline-image"
                  mode="aspectFit"
                />
                <text v-else class="placeholder-text">点击上传 / 拍照</text>
              </view>
            </view>
          </view>
          
          <!-- Upload Tips -->
          <view class="upload-tips">
            <view v-if="isIdPhoto" class="id-photo-tips">
              <view class="tip-group">
                <text class="tip-title">请<text class="highlight">不要</text>穿戴</text>
                <text class="tip-content">帽子、墨镜、围巾等</text>
              </view>
              <view class="tip-group">
                <text class="tip-title">请保持</text>
                <text class="tip-content">表情自然、眼神平视</text>
              </view>
            </view>
            <view v-else class="normal-tips">
              <view class="tip-item">
                <text class="tip-icon">📸</text>
                <text class="tip-text">建议正面拍摄</text>
              </view>
              <view class="tip-item">
                <text class="tip-icon">💡</text>
                <text class="tip-text">光线充足清晰</text>
              </view>
            </view>
          </view>
        </view>
        
        <!-- Generate Button -->
        <u-button 
          v-if="selectedFile"
          type="primary"
          size="large"
          shape="round"
          :custom-style="{ width: '100%', marginTop: '32rpx' }"
          :loading="isUploading"
          @click="handleGenerate"
        >
          开始生成（4张高清照片）
        </u-button>
      </view>
    </view>

    <!-- Image Preview Modal -->
    <u-modal 
      v-model="previewModalVisible"
      :show-cancel-button="false"
      :show-confirm-button="false"
      :mask-close-able="true"
    >
      <view class="preview-modal">
        <image :src="previewImage" class="preview-image" mode="aspectFit" />
      </view>
    </u-modal>
  </view>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { PhotoCategory, photoCategories, genderOptions } from '@/shared/types'
import { uploadApi } from '@/api'

// 静态资源
const outlineHuman = '/static/images/outline-human.png'
const sampleMale1 = '/static/images/Sample-Male-1_1758161866744.png'
const sampleMale2 = '/static/images/Sample-Male-2_1758161866744.png'
const sampleMale3 = '/static/images/Sample-Male-3_1758161866745.png'
const sampleMale4 = '/static/images/Sample-Male-4_1758161866744.png'
const wechatTestImage = '/static/images/wechat-test.png'

// WeChat frames
const wechatFrames = [
  '/static/images/WechatFrame-1_1758491861092.png',
  '/static/images/WechatFrame-2_1758491861090.png',
  '/static/images/WechatFrame-3_1758491861092.png',
  '/static/images/WechatFrame-4_1758491861090.png',
  '/static/images/WechatFrame-5_1758491861091.png',
  '/static/images/WechatFrame-6_1758491861088.png'
]

// 响应式数据
const currentCategory = ref<PhotoCategory>(PhotoCategory.PROFESSIONAL)
const selectedGender = ref('male')
const selectedFrame = ref(0)
const selectedFile = ref<string>('')
const uploadedImageUrl = ref('')
const previewModalVisible = ref(false)
const previewImage = ref('')
const isUploading = ref(false)

// 计算属性
const isIdPhoto = computed(() => currentCategory.value === PhotoCategory.ID_PHOTO)

const sampleImages = computed(() => {
  return [sampleMale1, sampleMale2, sampleMale3, sampleMale4]
})

const selectedWechatFrame = computed(() => {
  return wechatFrames[selectedFrame.value] || wechatFrames[0]
})

// 方法
const getPageTitle = () => {
  if (currentCategory.value === PhotoCategory.WECHAT_PORTRAIT) {
    return '微信头像框'
  }
  return '上传照片'
}

const getCurrentCategoryName = () => {
  const category = photoCategories.find(cat => cat.id === currentCategory.value)
  return category?.name || ''
}

const getGenderName = () => {
  const gender = genderOptions.find(g => g.id === selectedGender.value)
  return gender?.name || ''
}

const handleBack = () => {
  uni.navigateBack()
}

const handleSampleClick = (imageUrl: string) => {
  previewImage.value = imageUrl
  previewModalVisible.value = true
}

const handleUploadClick = () => {
  uni.chooseImage({
    count: 1,
    sizeType: ['compressed'],
    sourceType: ['album', 'camera'],
    success: (res) => {
      const tempFilePath = res.tempFilePaths[0]
      selectedFile.value = tempFilePath
      uploadedImageUrl.value = tempFilePath
    },
    fail: () => {
      uni.showToast({
        title: '选择图片失败',
        icon: 'error'
      })
    }
  })
}

const handleManualUpload = () => {
  handleUploadClick()
}

const handleOneClickGeneration = () => {
  // 一键生成逻辑，可能需要获取微信头像
  uni.showModal({
    title: '获取微信头像',
    content: '是否同意获取您的微信头像进行处理？',
    success: (res) => {
      if (res.confirm) {
        // 获取微信头像逻辑
        handleGetWechatAvatar()
      }
    }
  })
}

const handleGetWechatAvatar = () => {
  // 这里需要根据微信小程序API获取用户头像
  uni.getUserProfile({
    desc: '用于生成专属头像框',
    success: (res) => {
      selectedFile.value = res.userInfo.avatarUrl
      uploadedImageUrl.value = res.userInfo.avatarUrl
    },
    fail: () => {
      uni.showToast({
        title: '获取头像失败',
        icon: 'error'
      })
    }
  })
}

const handleGenerate = async () => {
  if (!selectedFile.value) {
    uni.showToast({
      title: '请先选择照片',
      icon: 'error'
    })
    return
  }
  
  isUploading.value = true
  
  try {
    // 上传文件
    const uploadResult = await uploadApi.uploadPhoto(selectedFile.value)
    
    if (uploadResult.success) {
      // 导航到生成页面
      uni.navigateTo({
        url: `/pages/generating/index?category=${currentCategory.value}&imageUrl=${encodeURIComponent(uploadResult.data.url)}&gender=${selectedGender.value}&frame=${selectedFrame.value}`
      })
    } else {
      throw new Error(uploadResult.message || '上传失败')
    }
  } catch (error) {
    console.error('Upload failed:', error)
    uni.showToast({
      title: '上传失败，请重试',
      icon: 'error'
    })
  } finally {
    isUploading.value = false
  }
}

// 页面加载时获取参数
onLoad((options) => {
  if (options?.category) {
    currentCategory.value = options.category as PhotoCategory
  }
  if (options?.gender) {
    selectedGender.value = options.gender
  }
  if (options?.frame) {
    selectedFrame.value = parseInt(options.frame) || 0
  }
})
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background-color: #f8f9fa;
}

.header {
  background: white;
  border-bottom: 1rpx solid #e5e7eb;
}

.category-display {
  padding: 24rpx;
  background: white;
  margin-bottom: 16rpx;
  
  .category-info {
    display: flex;
    align-items: center;
    gap: 16rpx;
    
    .category-name {
      font-size: 32rpx;
      font-weight: 600;
      color: #1f2937;
    }
    
    .gender-info {
      font-size: 28rpx;
      color: #6b7280;
      padding: 8rpx 16rpx;
      background: #f3f4f6;
      border-radius: 8rpx;
    }
  }
}

.samples-section {
  padding: 24rpx;
  background: white;
  margin-bottom: 16rpx;
  
  .section-title {
    display: flex;
    align-items: center;
    margin-bottom: 24rpx;
    
    .title-indicator {
      width: 6rpx;
      height: 32rpx;
      background: #22c55e;
      border-radius: 3rpx;
      margin-right: 16rpx;
    }
    
    .title-text {
      font-size: 32rpx;
      font-weight: 600;
      color: #1f2937;
    }
  }
  
  .wechat-preview {
    .wechat-composition {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 32rpx;
      padding: 40rpx 0;
      
      .frame-container {
        width: 220rpx;
        height: 220rpx;
        border-radius: 16rpx;
        overflow: hidden;
        background: #f3f4f6;
        
        .frame-image {
          width: 100%;
          height: 100%;
        }
      }
      
      .plus-icon {
        font-size: 48rpx;
        color: #9ca3af;
        font-weight: bold;
      }
      
      .avatar-placeholder {
        width: 220rpx;
        height: 220rpx;
        border: 4rpx dashed #d1d5db;
        border-radius: 16rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        
        .placeholder-text {
          font-size: 28rpx;
          color: #6b7280;
          text-align: center;
          line-height: 1.4;
        }
      }
    }
  }
  
  .normal-samples {
    .samples-grid {
      display: flex;
      gap: 12rpx;
      
      .sample-item {
        flex: 1;
        height: 200rpx;
        border-radius: 12rpx;
        overflow: hidden;
        
        .sample-image {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}

.upload-section {
  padding: 24rpx;
  background: white;
  
  .wechat-actions {
    .alternative-option {
      text-align: center;
      margin: 16rpx 0;
      
      .or-text {
        display: block;
        font-size: 24rpx;
        color: #6b7280;
        margin-bottom: 16rpx;
      }
    }
  }
  
  .normal-upload {
    .upload-area {
      background: #f9fafb;
      border-radius: 16rpx;
      padding: 32rpx;
      
      .photo-display {
        margin-bottom: 32rpx;
        
        .photo-container {
          width: 100%;
          min-height: 400rpx;
          background: white;
          border: 4rpx dashed #d1d5db;
          border-radius: 16rpx;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          
          &.id-photo {
            width: 342rpx;
            height: 456rpx;
            min-height: auto;
            margin: 0 auto;
          }
          
          .uploaded-image {
            width: 100%;
            height: 100%;
          }
          
          .upload-placeholder {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100%;
            
            .outline-image {
              width: 200rpx;
              height: 200rpx;
              opacity: 0.3;
              margin-bottom: 16rpx;
            }
            
            .placeholder-text {
              font-size: 28rpx;
              color: #9ca3af;
            }
          }
        }
      }
      
      .upload-tips {
        .id-photo-tips {
          display: flex;
          flex-direction: column;
          gap: 32rpx;
          
          .tip-group {
            .tip-title {
              display: block;
              font-size: 28rpx;
              font-weight: 600;
              color: #1f2937;
              margin-bottom: 8rpx;
              
              .highlight {
                color: #ef4444;
              }
            }
            
            .tip-content {
              font-size: 26rpx;
              color: #6b7280;
            }
          }
        }
        
        .normal-tips {
          display: flex;
          gap: 32rpx;
          
          .tip-item {
            flex: 1;
            text-align: center;
            
            .tip-icon {
              display: block;
              font-size: 32rpx;
              margin-bottom: 8rpx;
            }
            
            .tip-text {
              font-size: 24rpx;
              color: #6b7280;
            }
          }
        }
      }
    }
  }
}

.preview-modal {
  width: 100%;
  height: 600rpx;
  
  .preview-image {
    width: 100%;
    height: 100%;
  }
}
</style>