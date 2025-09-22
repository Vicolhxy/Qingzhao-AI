<template>
  <view class="container">
    <!-- Header -->
    <view class="header">
      <u-navbar 
        title="生成中"
        :border-bottom="false"
      />
    </view>

    <!-- Main Content -->
    <view class="content">
      <!-- Category Info -->
      <view class="category-info">
        <text class="category-name">{{ getCurrentCategoryName() }}</text>
        <text v-if="selectedGender && currentCategory !== PhotoCategory.WECHAT_PORTRAIT" class="gender-info">
          {{ getGenderName() }}
        </text>
      </view>

      <!-- Progress Section -->
      <view class="progress-section">
        <view class="progress-container">
          <u-circle-progress 
            :percentage="progress"
            :size="280"
            :stroke-width="8"
            active-color="#22c55e"
            inactive-color="#f3f4f6"
          >
            <view class="progress-content">
              <text class="progress-text">{{ progress }}%</text>
              <text class="progress-label">正在生成</text>
            </view>
          </u-circle-progress>
        </view>
        
        <view class="status-text">
          <text class="current-status">{{ currentStatus }}</text>
          <text class="status-description">{{ statusDescription }}</text>
        </view>
      </view>

      <!-- Preview Images -->
      <view class="preview-section">
        <view class="section-title">
          <text class="title-text">预览效果</text>
        </view>
        
        <view class="preview-grid">
          <view 
            v-for="(placeholder, index) in 4" 
            :key="index"
            class="preview-item"
            :class="{ active: index < completedCount }"
          >
            <view v-if="index < completedCount" class="completed-item">
              <image :src="placeholderImage" class="preview-image" mode="aspectFill" />
              <view class="check-icon">✓</view>
            </view>
            <view v-else class="loading-item">
              <view class="loading-placeholder"></view>
              <u-loading-icon 
                v-if="index === completedCount" 
                mode="spinner" 
                size="48"
                color="#22c55e"
              />
            </view>
          </view>
        </view>
      </view>

      <!-- Tips -->
      <view class="tips-section">
        <view class="tips-container">
          <view class="tip-item">
            <text class="tip-icon">⚡</text>
            <text class="tip-text">AI正在为您生成专属照片</text>
          </view>
          <view class="tip-item">
            <text class="tip-icon">🎨</text>
            <text class="tip-text">预计需要30-60秒</text>
          </view>
          <view class="tip-item">
            <text class="tip-icon">📱</text>
            <text class="tip-text">请保持页面打开</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { PhotoCategory, photoCategories, genderOptions } from '@/shared/types'
import { photoApi } from '@/api'

// 响应式数据
const currentCategory = ref<PhotoCategory>(PhotoCategory.PROFESSIONAL)
const selectedGender = ref('male')
const selectedFrame = ref(0)
const imageUrl = ref('')
const jobId = ref('')
const progress = ref(0)
const completedCount = ref(0)
const currentStatus = ref('准备中...')
const statusDescription = ref('正在初始化生成任务')

// 定时器
let progressTimer: ReturnType<typeof setInterval> | null = null
let statusTimer: ReturnType<typeof setInterval> | null = null

// 静态资源
const placeholderImage = '/static/images/placeholder-result.png'

// 状态描述数组
const statusSteps = [
  { status: '分析照片...', description: '正在分析您的照片特征' },
  { status: '优化效果...', description: '应用AI算法优化处理' },
  { status: '生成照片...', description: '正在生成高质量照片' },
  { status: '最终处理...', description: '添加最后的润色效果' },
  { status: '完成生成!', description: '您的专属照片已生成完成' }
]

// 计算属性
const getCurrentCategoryName = () => {
  const category = photoCategories.find(cat => cat.id === currentCategory.value)
  return category?.name || ''
}

const getGenderName = () => {
  const gender = genderOptions.find(g => g.id === selectedGender.value)
  return gender?.name || ''
}

// 方法
const startGeneration = async () => {
  if (!imageUrl.value) {
    uni.showToast({
      title: '参数错误',
      icon: 'error'
    })
    return
  }

  try {
    // 创建生成任务
    const result = await photoApi.createJob({
      originalImageUrl: imageUrl.value,
      category: currentCategory.value
    })

    if (result.success && result.data) {
      jobId.value = result.data.id
      startProgressSimulation()
      startStatusPolling()
    } else {
      throw new Error(result.message || '创建任务失败')
    }
  } catch (error) {
    console.error('Generation failed:', error)
    uni.showToast({
      title: '生成失败，请重试',
      icon: 'error'
    })
    setTimeout(() => {
      uni.navigateBack()
    }, 2000)
  }
}

const startProgressSimulation = () => {
  progressTimer = setInterval(() => {
    if (progress.value < 95) {
      // 模拟进度增长
      const increment = Math.random() * 5 + 2
      progress.value = Math.min(progress.value + increment, 95)
      
      // 更新完成数量
      if (progress.value > 25 && completedCount.value < 1) {
        completedCount.value = 1
      } else if (progress.value > 50 && completedCount.value < 2) {
        completedCount.value = 2
      } else if (progress.value > 75 && completedCount.value < 3) {
        completedCount.value = 3
      } else if (progress.value > 90 && completedCount.value < 4) {
        completedCount.value = 4
      }
    }
  }, 800)
}

const startStatusPolling = () => {
  let statusIndex = 0
  
  // 更新状态文本
  const updateStatus = () => {
    if (statusIndex < statusSteps.length) {
      currentStatus.value = statusSteps[statusIndex].status
      statusDescription.value = statusSteps[statusIndex].description
      statusIndex++
    }
  }
  
  updateStatus() // 立即更新第一个状态
  
  statusTimer = setInterval(updateStatus, 12000) // 每12秒更新一次状态
  
  // 轮询任务状态
  const pollJobStatus = async () => {
    if (!jobId.value) return
    
    try {
      const result = await photoApi.getJob(jobId.value)
      
      if (result.success && result.data) {
        const job = result.data
        
        if (job.status === 'completed') {
          // 生成完成
          progress.value = 100
          completedCount.value = 4
          currentStatus.value = '生成完成!'
          statusDescription.value = '正在跳转到结果页面...'
          
          // 清除定时器
          if (progressTimer) clearInterval(progressTimer)
          if (statusTimer) clearInterval(statusTimer)
          
          setTimeout(() => {
            uni.redirectTo({
              url: `/pages/result/index?jobId=${jobId.value}`
            })
          }, 2000)
        } else if (job.status === 'failed') {
          throw new Error('生成失败')
        }
      }
    } catch (error) {
      console.error('Poll job status failed:', error)
    }
  }
  
  // 每5秒轮询一次任务状态
  const pollTimer = setInterval(pollJobStatus, 5000)
  
  // 60秒后如果还没完成，直接跳转到结果页面
  setTimeout(() => {
    clearInterval(pollTimer)
    if (progress.value < 100) {
      progress.value = 100
      completedCount.value = 4
      currentStatus.value = '生成完成!'
      
      setTimeout(() => {
        uni.redirectTo({
          url: `/pages/result/index?jobId=${jobId.value || 'mock'}`
        })
      }, 1000)
    }
  }, 60000)
}

// 页面加载
onLoad((options) => {
  if (options?.category) {
    currentCategory.value = options.category as PhotoCategory
  }
  if (options?.imageUrl) {
    imageUrl.value = decodeURIComponent(options.imageUrl)
  }
  if (options?.gender) {
    selectedGender.value = options.gender
  }
  if (options?.frame) {
    selectedFrame.value = parseInt(options.frame) || 0
  }
  
  // 开始生成
  startGeneration()
})

// 页面卸载时清理定时器
onUnmounted(() => {
  if (progressTimer) clearInterval(progressTimer)
  if (statusTimer) clearInterval(statusTimer)
})
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.header {
  :deep(.u-navbar) {
    background: transparent !important;
    color: white !important;
  }
}

.content {
  padding: 40rpx 24rpx;
  color: white;
}

.category-info {
  text-align: center;
  margin-bottom: 60rpx;
  
  .category-name {
    display: block;
    font-size: 36rpx;
    font-weight: 600;
    color: white;
    margin-bottom: 12rpx;
  }
  
  .gender-info {
    font-size: 28rpx;
    color: rgba(255, 255, 255, 0.8);
    padding: 8rpx 16rpx;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 16rpx;
    display: inline-block;
  }
}

.progress-section {
  text-align: center;
  margin-bottom: 60rpx;
  
  .progress-container {
    margin-bottom: 40rpx;
    
    .progress-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      
      .progress-text {
        font-size: 64rpx;
        font-weight: 700;
        color: white;
        line-height: 1;
        margin-bottom: 8rpx;
      }
      
      .progress-label {
        font-size: 28rpx;
        color: rgba(255, 255, 255, 0.8);
      }
    }
  }
  
  .status-text {
    .current-status {
      display: block;
      font-size: 32rpx;
      font-weight: 600;
      color: white;
      margin-bottom: 8rpx;
    }
    
    .status-description {
      font-size: 26rpx;
      color: rgba(255, 255, 255, 0.7);
    }
  }
}

.preview-section {
  margin-bottom: 60rpx;
  
  .section-title {
    text-align: center;
    margin-bottom: 32rpx;
    
    .title-text {
      font-size: 32rpx;
      font-weight: 600;
      color: white;
    }
  }
  
  .preview-grid {
    display: flex;
    gap: 16rpx;
    
    .preview-item {
      flex: 1;
      height: 160rpx;
      border-radius: 12rpx;
      overflow: hidden;
      background: rgba(255, 255, 255, 0.1);
      border: 2rpx solid rgba(255, 255, 255, 0.2);
      position: relative;
      
      &.active {
        border-color: #22c55e;
        background: rgba(34, 197, 94, 0.2);
      }
      
      .completed-item {
        width: 100%;
        height: 100%;
        position: relative;
        
        .preview-image {
          width: 100%;
          height: 100%;
        }
        
        .check-icon {
          position: absolute;
          top: 8rpx;
          right: 8rpx;
          width: 32rpx;
          height: 32rpx;
          background: #22c55e;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20rpx;
          color: white;
          font-weight: bold;
        }
      }
      
      .loading-item {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        
        .loading-placeholder {
          width: 80%;
          height: 80%;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 8rpx;
        }
      }
    }
  }
}

.tips-section {
  .tips-container {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 16rpx;
    padding: 32rpx;
    
    .tip-item {
      display: flex;
      align-items: center;
      margin-bottom: 24rpx;
      
      &:last-child {
        margin-bottom: 0;
      }
      
      .tip-icon {
        font-size: 32rpx;
        margin-right: 16rpx;
      }
      
      .tip-text {
        font-size: 28rpx;
        color: rgba(255, 255, 255, 0.9);
        flex: 1;
      }
    }
  }
}
</style>