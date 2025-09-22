<template>
  <view class="container">
    <!-- Header -->
    <view class="header">
      <u-navbar 
        title="生成结果"
        left-icon="arrow-left"
        @left-click="handleBack"
      />
    </view>

    <!-- Category Info -->
    <view class="category-info">
      <text class="category-name">{{ getCurrentCategoryName() }}</text>
      <text class="success-badge">生成成功</text>
    </view>

    <!-- Results Grid -->
    <view class="results-section">
      <view class="section-title">
        <view class="title-indicator"></view>
        <text class="title-text">生成结果（{{ results.length }}张）</text>
      </view>
      
      <view class="results-grid">
        <view 
          v-for="(result, index) in results" 
          :key="index"
          class="result-item"
          @tap="handlePreview(result, index)"
        >
          <image :src="result.watermarkedUrl" class="result-image" mode="aspectFill" />
          <view class="watermark-overlay">
            <text class="watermark-text">AI照片处理</text>
          </view>
        </view>
      </view>
    </view>

    <!-- WeChat Avatar Composer (only for WeChat category) -->
    <view v-if="currentCategory === PhotoCategory.WECHAT_PORTRAIT" class="wechat-composer">
      <view class="section-title">
        <view class="title-indicator"></view>
        <text class="title-text">头像框合成</text>
      </view>
      
      <view class="composer-grid">
        <view 
          v-for="(frame, index) in wechatFrames" 
          :key="index"
          class="composer-item"
          @tap="handleWechatCompose(frame, index)"
        >
          <canvas 
            :canvas-id="`wechat-canvas-${index}`"
            class="composer-canvas"
          />
          <view class="watermark-overlay">
            <text class="watermark-text">预览</text>
          </view>
        </view>
      </view>
    </view>

    <!-- Action Buttons -->
    <view class="action-section">
      <view class="action-buttons">
        <u-button 
          type="info"
          size="large"
          plain
          shape="round"
          :custom-style="{ flex: 1, marginRight: '16rpx' }"
          @click="handleRegenerate"
        >
          重新生成
        </u-button>
        
        <u-button 
          type="primary"
          size="large"
          shape="round"
          :custom-style="{ flex: 1 }"
          @click="handleDownload"
        >
          获取高清原图
        </u-button>
      </view>
      
      <view class="price-info">
        <text class="price-text">高清原图：¥9.9</text>
        <text class="original-price">原价¥19.9</text>
      </view>
    </view>

    <!-- Preview Modal -->
    <u-modal 
      v-model="previewModalVisible"
      :show-cancel-button="false"
      :show-confirm-button="false"
      :mask-close-able="true"
      width="90%"
      border-radius="16"
    >
      <view class="preview-modal">
        <image :src="currentPreviewImage" class="preview-image" mode="aspectFit" />
        <view class="preview-actions">
          <u-button 
            type="info"
            size="normal"
            plain
            @click="handleSaveToAlbum"
          >
            保存到相册
          </u-button>
          <u-button 
            type="primary"
            size="normal"
            @click="handleDownloadSingle"
          >
            获取高清版
          </u-button>
        </view>
      </view>
    </u-modal>

    <!-- Payment Modal -->
    <u-modal 
      v-model="paymentModalVisible"
      title="获取高清原图"
      :show-cancel-button="true"
      :show-confirm-button="true"
      confirm-text="立即支付"
      @confirm="handlePay"
      @cancel="paymentModalVisible = false"
    >
      <view class="payment-modal">
        <view class="payment-info">
          <text class="payment-title">高清无水印照片</text>
          <text class="payment-count">{{ results.length }}张照片</text>
          <view class="payment-price">
            <text class="current-price">¥9.9</text>
            <text class="original-price">¥19.9</text>
          </view>
        </view>
        
        <view class="payment-features">
          <view class="feature-item">
            <text class="feature-icon">✓</text>
            <text class="feature-text">无水印高清图片</text>
          </view>
          <view class="feature-item">
            <text class="feature-icon">✓</text>
            <text class="feature-text">支持保存到相册</text>
          </view>
          <view class="feature-item">
            <text class="feature-icon">✓</text>
            <text class="feature-text">永久有效</text>
          </view>
        </view>
      </view>
    </u-modal>
  </view>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { PhotoCategory, photoCategories } from '@/shared/types'
import { photoApi, paymentApi } from '@/api'

// 响应式数据
const currentCategory = ref<PhotoCategory>(PhotoCategory.PROFESSIONAL)
const jobId = ref('')
const results = ref<Array<{ watermarkedUrl: string; highResUrl: string }>>([])
const previewModalVisible = ref(false)
const paymentModalVisible = ref(false)
const currentPreviewImage = ref('')
const currentPreviewIndex = ref(0)
const isPaid = ref(false)

// WeChat相关
const wechatFrames = [
  '/static/images/wechat-frame-1.png',
  '/static/images/wechat-frame-2.png',
  '/static/images/wechat-frame-3.png',
  '/static/images/wechat-frame-4.png',
]

// 计算属性
const getCurrentCategoryName = () => {
  const category = photoCategories.find(cat => cat.id === currentCategory.value)
  return category?.name || ''
}

// 方法
const loadJobResult = async () => {
  if (!jobId.value) {
    // 如果没有jobId，使用模拟数据
    loadMockData()
    return
  }

  try {
    const result = await photoApi.getJob(jobId.value)
    
    if (result.success && result.data) {
      const job = result.data
      isPaid.value = job.isPaid
      
      if (job.watermarkedImages && job.watermarkedImages.length > 0) {
        results.value = job.watermarkedImages.map((watermarked, index) => ({
          watermarkedUrl: watermarked,
          highResUrl: job.highResImages?.[index] || watermarked
        }))
      } else {
        loadMockData()
      }
    } else {
      loadMockData()
    }
  } catch (error) {
    console.error('Load job result failed:', error)
    loadMockData()
  }
}

const loadMockData = () => {
  // 模拟数据
  results.value = [
    { watermarkedUrl: '/static/images/result-1.png', highResUrl: '/static/images/result-1-hd.png' },
    { watermarkedUrl: '/static/images/result-2.png', highResUrl: '/static/images/result-2-hd.png' },
    { watermarkedUrl: '/static/images/result-3.png', highResUrl: '/static/images/result-3-hd.png' },
    { watermarkedUrl: '/static/images/result-4.png', highResUrl: '/static/images/result-4-hd.png' },
  ]
}

const handlePreview = (result: any, index: number) => {
  currentPreviewImage.value = result.watermarkedUrl
  currentPreviewIndex.value = index
  previewModalVisible.value = true
}

const handleWechatCompose = (frameUrl: string, index: number) => {
  // 使用Canvas合成微信头像框
  const canvasId = `wechat-canvas-${index}`
  const ctx = uni.createCanvasContext(canvasId)
  
  // 这里应该实现Canvas合成逻辑
  // 由于微信小程序的Canvas API复杂，这里简化处理
  console.log('Compose WeChat avatar with frame:', frameUrl)
  
  // 预览合成结果
  handlePreview({ watermarkedUrl: frameUrl }, index)
}

const handleRegenerate = () => {
  uni.showModal({
    title: '重新生成',
    content: '确定要重新生成照片吗？',
    success: (res) => {
      if (res.confirm) {
        uni.navigateBack({
          delta: 2  // 返回到上传页面
        })
      }
    }
  })
}

const handleDownload = () => {
  if (isPaid.value) {
    // 已经支付过，直接下载
    downloadAllImages()
  } else {
    // 需要支付
    paymentModalVisible.value = true
  }
}

const handleDownloadSingle = () => {
  if (isPaid.value) {
    const result = results.value[currentPreviewIndex.value]
    downloadImage(result.highResUrl)
  } else {
    previewModalVisible.value = false
    paymentModalVisible.value = true
  }
}

const handleSaveToAlbum = () => {
  const imageUrl = currentPreviewImage.value
  
  uni.saveImageToPhotosAlbum({
    filePath: imageUrl,
    success: () => {
      uni.showToast({
        title: '保存成功',
        icon: 'success'
      })
    },
    fail: () => {
      uni.showToast({
        title: '保存失败',
        icon: 'error'
      })
    }
  })
}

const handlePay = async () => {
  try {
    uni.showLoading({ title: '正在支付...' })
    
    // 创建支付订单
    const paymentResult = await paymentApi.createPayment({
      jobId: jobId.value,
      amount: '9.9',
      paymentMethod: 'wechat_pay'
    })
    
    if (paymentResult.success && paymentResult.data) {
      // 调用微信支付
      uni.requestPayment({
        timeStamp: Date.now().toString(),
        nonceStr: 'random_string',
        package: `prepay_id=${paymentResult.data.id}`,
        signType: 'RSA',
        paySign: 'payment_sign',
        success: () => {
          isPaid.value = true
          paymentModalVisible.value = false
          uni.showToast({
            title: '支付成功',
            icon: 'success'
          })
          // 下载图片
          downloadAllImages()
        },
        fail: () => {
          uni.showToast({
            title: '支付失败',
            icon: 'error'
          })
        }
      })
    }
  } catch (error) {
    console.error('Payment failed:', error)
    uni.showToast({
      title: '支付失败',
      icon: 'error'
    })
  } finally {
    uni.hideLoading()
  }
}

const downloadAllImages = () => {
  results.value.forEach((result, index) => {
    setTimeout(() => {
      downloadImage(result.highResUrl)
    }, index * 500)  // 延迟下载避免并发问题
  })
}

const downloadImage = (imageUrl: string) => {
  uni.downloadFile({
    url: imageUrl,
    success: (res) => {
      uni.saveImageToPhotosAlbum({
        filePath: res.tempFilePath,
        success: () => {
          uni.showToast({
            title: '保存成功',
            icon: 'success'
          })
        }
      })
    },
    fail: () => {
      uni.showToast({
        title: '下载失败',
        icon: 'error'
      })
    }
  })
}

const handleBack = () => {
  uni.showModal({
    title: '确认返回',
    content: '返回首页将丢失当前结果，确定要返回吗？',
    success: (res) => {
      if (res.confirm) {
        uni.reLaunch({
          url: '/pages/home/index'
        })
      }
    }
  })
}

// 页面加载
onLoad((options) => {
  if (options?.jobId) {
    jobId.value = options.jobId
  }
  if (options?.category) {
    currentCategory.value = options.category as PhotoCategory
  }
  
  loadJobResult()
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

.category-info {
  padding: 24rpx;
  background: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16rpx;
  
  .category-name {
    font-size: 32rpx;
    font-weight: 600;
    color: #1f2937;
  }
  
  .success-badge {
    font-size: 24rpx;
    color: #22c55e;
    background: #dcfce7;
    padding: 8rpx 16rpx;
    border-radius: 16rpx;
  }
}

.results-section, .wechat-composer {
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
  
  .results-grid, .composer-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 16rpx;
    
    .result-item, .composer-item {
      width: calc((100% - 16rpx) / 2);
      aspect-ratio: 3/4;
      border-radius: 12rpx;
      overflow: hidden;
      position: relative;
      background: #f3f4f6;
      
      .result-image, .composer-canvas {
        width: 100%;
        height: 100%;
      }
      
      .watermark-overlay {
        position: absolute;
        inset: 0;
        background: rgba(0, 0, 0, 0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        
        .watermark-text {
          color: white;
          font-size: 28rpx;
          font-weight: 600;
          text-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.5);
          transform: rotate(-15deg);
        }
      }
    }
  }
}

.action-section {
  padding: 24rpx;
  background: white;
  
  .action-buttons {
    display: flex;
    gap: 16rpx;
    margin-bottom: 16rpx;
  }
  
  .price-info {
    text-align: center;
    
    .price-text {
      font-size: 28rpx;
      color: #ef4444;
      font-weight: 600;
      margin-right: 16rpx;
    }
    
    .original-price {
      font-size: 24rpx;
      color: #9ca3af;
      text-decoration: line-through;
    }
  }
}

.preview-modal {
  .preview-image {
    width: 100%;
    height: 500rpx;
    margin-bottom: 24rpx;
  }
  
  .preview-actions {
    display: flex;
    gap: 16rpx;
  }
}

.payment-modal {
  padding: 20rpx 0;
  
  .payment-info {
    text-align: center;
    margin-bottom: 32rpx;
    
    .payment-title {
      display: block;
      font-size: 32rpx;
      font-weight: 600;
      color: #1f2937;
      margin-bottom: 8rpx;
    }
    
    .payment-count {
      display: block;
      font-size: 26rpx;
      color: #6b7280;
      margin-bottom: 16rpx;
    }
    
    .payment-price {
      .current-price {
        font-size: 48rpx;
        color: #ef4444;
        font-weight: 700;
        margin-right: 16rpx;
      }
      
      .original-price {
        font-size: 28rpx;
        color: #9ca3af;
        text-decoration: line-through;
      }
    }
  }
  
  .payment-features {
    .feature-item {
      display: flex;
      align-items: center;
      margin-bottom: 16rpx;
      
      .feature-icon {
        color: #22c55e;
        font-weight: bold;
        margin-right: 12rpx;
      }
      
      .feature-text {
        color: #374151;
        font-size: 28rpx;
      }
    }
  }
}
</style>