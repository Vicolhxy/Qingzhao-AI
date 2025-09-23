<template>
  <view class="container">
    <!-- Banner Section -->
    <view class="banner-section">
      <image :src="bannerImage" class="banner-image" mode="aspectFill" />
    </view>

    <!-- Photo Categories Section -->
    <view class="categories-section">
      <view class="section-header">
        <view class="section-title">选择照片类型</view>
      </view>
      
      <view class="categories-grid">
        <view 
          v-for="category in photoCategories" 
          :key="category.id"
          class="category-item"
          :class="{ active: selectedCategory === category.id }"
          @tap="handleCategorySelect(category.id)"
        >
          <text class="category-name">{{ category.name }}</text>
        </view>
      </view>
    </view>

    <!-- Gender Selection Section (only for non-WeChat categories) -->
    <view v-if="selectedCategory !== PhotoCategory.WECHAT_PORTRAIT" class="gender-section">
      <view class="section-header">
        <view class="section-title">选择性别</view>
      </view>
      
      <view class="gender-options">
        <view 
          v-for="gender in genderOptions" 
          :key="gender.id"
          class="gender-item"
          :class="{ active: selectedGender === gender.id }"
          @tap="handleGenderSelect(gender.id)"
        >
          <text class="gender-icon">{{ gender.icon }}</text>
          <text class="gender-name">{{ gender.name }}</text>
        </view>
      </view>
    </view>

    <!-- Sample Images Section -->
    <view class="samples-section">
      <view class="section-header">
        <view class="section-title">样片展示</view>
      </view>
      
      <!-- WeChat Portrait Special Layout -->
      <view v-if="selectedCategory === PhotoCategory.WECHAT_PORTRAIT" class="wechat-samples">
        <view class="wechat-main-sample">
          <image :src="wechatTestImage" class="main-sample-image" mode="aspectFill" />
          <view class="wechat-frames-grid">
            <view 
              v-for="(frame, index) in wechatFrames" 
              :key="index"
              class="frame-item"
              :class="{ active: selectedFrame === index }"
              @tap="handleFrameSelect(index)"
            >
              <image :src="frame" class="frame-image" mode="scaleToFill" />
            </view>
          </view>
        </view>
      </view>
      
      <!-- Other Categories Layout -->
      <view v-else class="normal-samples">
        <view class="large-sample">
          <image :src="currentMainImage" class="main-sample-image" mode="aspectFill" />
        </view>
        
        <view class="small-samples">
          <view 
            v-for="(sample, index) in smallSampleImages" 
            :key="index"
            class="small-sample-item"
          >
            <image :src="sample" class="small-sample-image" mode="aspectFill" />
          </view>
        </view>
      </view>
    </view>

    <!-- Action Button -->
    <view class="action-section">
      <u-button 
        type="primary" 
        size="large"
        shape="round"
        :custom-style="{ width: '100%', marginBottom: '20rpx' }"
        @click="handleStartGeneration"
      >
        开始生成我的{{ getCurrentCategoryName() }}
      </u-button>
    </view>

    <!-- Footer Links -->
    <view class="footer-links">
      <text class="link-text" @tap="navigateToTerms">用户协议</text>
      <text class="link-divider">|</text>
      <text class="link-text" @tap="navigateToPrivacy">隐私政策</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { PhotoCategory, photoCategories, genderOptions } from '@/shared/types'

// 静态资源导入
const bannerImage = '/static/images/banner.png'
const wechatTestImage = '/static/images/wechat-test.png'
const sampleMale1 = '/static/images/Sample-Male-1_1758161866744.png'
const sampleMale2 = '/static/images/Sample-Male-2_1758161866744.png'
const sampleMale3 = '/static/images/Sample-Male-3_1758161866745.png'
const sampleMale4 = '/static/images/Sample-Male-4_1758161866744.png'

// WeChat frame images
const wechatFrames = [
  '/static/images/WechatFrame-1_1758491861092.png',
  '/static/images/WechatFrame-2_1758491861090.png',
  '/static/images/WechatFrame-3_1758491861092.png',
  '/static/images/WechatFrame-4_1758491861090.png',
  '/static/images/WechatFrame-5_1758491861091.png',
  '/static/images/WechatFrame-6_1758491861088.png'
]

// 响应式数据
const selectedGender = ref('male')
const selectedCategory = ref<PhotoCategory>(PhotoCategory.PROFESSIONAL)
const selectedFrame = ref(0)
const currentImageIndex = ref(0)

// All sample images
const allSampleImages = [sampleMale1, sampleMale2, sampleMale3, sampleMale4]

// 计算属性
const currentMainImage = computed(() => {
  return allSampleImages[currentImageIndex.value]
})

const smallSampleImages = computed(() => {
  const totalImages = allSampleImages.length
  const result = []
  
  for (let i = 1; i <= 3; i++) {
    const index = (currentImageIndex.value + i) % totalImages
    result.push(allSampleImages[index])
  }
  
  return result
})

// 方法
const handleCategorySelect = (categoryId: PhotoCategory) => {
  selectedCategory.value = categoryId
}

const handleGenderSelect = (genderId: string) => {
  selectedGender.value = genderId
}

const handleFrameSelect = (frameIndex: number) => {
  selectedFrame.value = frameIndex
}

const getCurrentCategoryName = () => {
  const category = photoCategories.find(cat => cat.id === selectedCategory.value)
  return category?.name || '照片'
}

const handleStartGeneration = () => {
  // 构建查询参数
  const query: Record<string, string> = {
    category: selectedCategory.value
  }
  
  if (selectedCategory.value !== PhotoCategory.WECHAT_PORTRAIT) {
    query.gender = selectedGender.value
  } else {
    query.frame = selectedFrame.value.toString()
  }
  
  // 导航到上传页面
  uni.navigateTo({
    url: `/pages/upload/index?${new URLSearchParams(query).toString()}`
  })
}

const navigateToTerms = () => {
  uni.navigateTo({
    url: '/pages/terms/index'
  })
}

const navigateToPrivacy = () => {
  uni.navigateTo({
    url: '/pages/privacy/index'
  })
}

// 生命周期
onMounted(() => {
  // 自动切换样片图片
  setInterval(() => {
    if (selectedCategory.value !== PhotoCategory.WECHAT_PORTRAIT) {
      currentImageIndex.value = (currentImageIndex.value + 1) % allSampleImages.length
    }
  }, 3000)
})
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background-color: #f8f9fa;
  padding: 20rpx;
}

.banner-section {
  margin-bottom: 40rpx;
  
  .banner-image {
    width: 100%;
    height: 300rpx;
    border-radius: 16rpx;
  }
}

.section-header {
  margin-bottom: 24rpx;
  
  .section-title {
    font-size: 32rpx;
    font-weight: 600;
    color: #333;
  }
}

.categories-section {
  margin-bottom: 40rpx;
  
  .categories-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 16rpx;
    
    .category-item {
      flex: 1;
      min-width: 160rpx;
      padding: 24rpx 16rpx;
      background: white;
      border-radius: 12rpx;
      text-align: center;
      border: 2rpx solid #e5e7eb;
      transition: all 0.2s;
      
      &.active {
        border-color: #3b82f6;
        background: #eff6ff;
      }
      
      .category-name {
        font-size: 28rpx;
        color: #374151;
        font-weight: 500;
      }
    }
  }
}

.gender-section {
  margin-bottom: 40rpx;
  
  .gender-options {
    display: flex;
    gap: 16rpx;
    
    .gender-item {
      flex: 1;
      padding: 24rpx;
      background: white;
      border-radius: 12rpx;
      text-align: center;
      border: 2rpx solid #e5e7eb;
      transition: all 0.2s;
      
      &.active {
        border-color: #3b82f6;
        background: #eff6ff;
      }
      
      .gender-icon {
        display: block;
        font-size: 48rpx;
        margin-bottom: 8rpx;
      }
      
      .gender-name {
        font-size: 28rpx;
        color: #374151;
        font-weight: 500;
      }
    }
  }
}

.samples-section {
  margin-bottom: 40rpx;
  
  .wechat-samples {
    .wechat-main-sample {
      position: relative;
      
      .main-sample-image {
        width: 100%;
        height: 400rpx;
        border-radius: 16rpx;
        margin-bottom: 20rpx;
      }
      
      .wechat-frames-grid {
        display: flex;
        flex-wrap: wrap;
        gap: 12rpx;
        
        .frame-item {
          width: calc((100% - 24rpx) / 3);
          height: 120rpx;
          border-radius: 12rpx;
          overflow: hidden;
          border: 4rpx solid transparent;
          
          &.active {
            border-color: #3b82f6;
          }
          
          .frame-image {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
  
  .normal-samples {
    .large-sample {
      margin-bottom: 20rpx;
      
      .main-sample-image {
        width: 100%;
        height: 400rpx;
        border-radius: 16rpx;
      }
    }
    
    .small-samples {
      display: flex;
      gap: 12rpx;
      
      .small-sample-item {
        flex: 1;
        height: 120rpx;
        border-radius: 12rpx;
        overflow: hidden;
        
        .small-sample-image {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}

.action-section {
  margin-bottom: 40rpx;
}

.footer-links {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20rpx 0;
  
  .link-text {
    font-size: 24rpx;
    color: #6b7280;
    
    &:active {
      color: #3b82f6;
    }
  }
  
  .link-divider {
    margin: 0 16rpx;
    color: #d1d5db;
  }
}
</style>