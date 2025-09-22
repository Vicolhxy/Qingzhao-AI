<template>
  <view id="app">
    <!-- 全局组件 -->
  </view>
</template>

<script setup lang="ts">
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app'

onLaunch(() => {
  console.log('App Launch')
  // 应用启动时的逻辑
})

onShow(() => {
  console.log('App Show')
  // 应用从后台进入前台时的逻辑
})

onHide(() => {
  console.log('App Hide')
  // 应用从前台进入后台时的逻辑
})
</script>

<style lang="scss">
/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
@import "uview-plus/index.scss";

page {
  background-color: #f8f9fa;
}

/* 全局样式 */
.container {
  min-height: 100vh;
  background-color: #f8f9fa;
}

.safe-area {
  padding-bottom: env(safe-area-inset-bottom);
}

/* 通用工具类 */
.flex {
  display: flex;
}

.flex-column {
  flex-direction: column;
}

.flex-center {
  align-items: center;
  justify-content: center;
}

.text-center {
  text-align: center;
}

.w-full {
  width: 100%;
}

.h-full {
  height: 100%;
}

.rounded {
  border-radius: 8rpx;
}

.shadow {
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
}
</style>