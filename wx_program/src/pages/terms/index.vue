<template>
  <view class="container">
    <!-- Header -->
    <view class="header">
      <u-navbar 
        title="用户协议"
        left-icon="arrow-left"
        @left-click="handleBack"
      />
    </view>

    <!-- Content -->
    <view class="content">
      <scroll-view class="scroll-content" scroll-y>
        <view class="article">
          <view class="article-header">
            <text class="article-title">AI照片处理用户服务协议</text>
            <text class="article-date">生效日期：2024年1月1日</text>
          </view>

          <view class="article-body">
            <view class="section">
              <text class="section-title">1. 服务说明</text>
              <text class="section-content">
                本应用（AI照片处理）是一款基于人工智能技术的照片处理服务，为用户提供专业照片、艺术照片、证件照等多种照片生成服务。
              </text>
            </view>

            <view class="section">
              <text class="section-title">2. 服务内容</text>
              <text class="section-content">
                2.1 专业职场照生成：为用户生成适合职场使用的专业照片
                <br/>2.2 黑白艺术照生成：提供艺术风格的黑白照片处理
                <br/>2.3 证件照生成：按照标准规格生成各类证件照片
                <br/>2.4 微信头像框：提供个性化的微信头像框合成服务
              </text>
            </view>

            <view class="section">
              <text class="section-title">3. 用户权利与义务</text>
              <text class="section-content">
                3.1 用户有权使用本应用提供的所有合法服务
                <br/>3.2 用户应确保上传的照片内容合法，不包含违法、有害信息
                <br/>3.3 用户不得将生成的照片用于违法用途
                <br/>3.4 用户应妥善保管账户信息，对账户下的行为承担责任
              </text>
            </view>

            <view class="section">
              <text class="section-title">4. 隐私保护</text>
              <text class="section-content">
                4.1 我们严格保护用户隐私，用户上传的原始照片在处理完成后将自动删除
                <br/>4.2 生成的照片仅用户本人可见和使用
                <br/>4.3 我们不会将用户照片用于其他商业用途
                <br/>4.4 详细隐私政策请参见《隐私政策》
              </text>
            </view>

            <view class="section">
              <text class="section-title">5. 服务费用</text>
              <text class="section-content">
                5.1 本应用提供免费的预览服务
                <br/>5.2 获取高清无水印版本需要支付相应费用
                <br/>5.3 费用标准在应用内明确显示，用户支付前请仔细确认
                <br/>5.4 已支付费用原则上不予退还，特殊情况除外
              </text>
            </view>

            <view class="section">
              <text class="section-title">6. 免责声明</text>
              <text class="section-content">
                6.1 本应用基于AI技术提供服务，生成效果可能因个人特征而异
                <br/>6.2 我们不保证生成结果完全符合用户期望
                <br/>6.3 因网络、设备等外部因素导致的服务中断，我们不承担责任
                <br/>6.4 用户因违规使用本服务产生的后果由用户自行承担
              </text>
            </view>

            <view class="section">
              <text class="section-title">7. 服务变更与终止</text>
              <text class="section-content">
                7.1 我们有权根据业务需要调整服务内容和价格
                <br/>7.2 重大变更将提前通知用户
                <br/>7.3 用户可以随时停止使用本服务
                <br/>7.4 我们有权终止违规用户的服务
              </text>
            </view>

            <view class="section">
              <text class="section-title">8. 法律适用</text>
              <text class="section-content">
                8.1 本协议适用中华人民共和国法律
                <br/>8.2 因本协议产生的争议，双方应友好协商解决
                <br/>8.3 协商不成的，提交有管辖权的人民法院解决
              </text>
            </view>

            <view class="section">
              <text class="section-title">9. 联系我们</text>
              <text class="section-content">
                如果您对本协议有任何疑问，请通过应用内客服或发送邮件至service@example.com联系我们。
              </text>
            </view>
          </view>

          <view class="article-footer">
            <text class="footer-text">本协议最终解释权归AI照片处理所有</text>
            <text class="footer-date">最后更新：2024年1月1日</text>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script setup lang="ts">
const handleBack = () => {
  uni.navigateBack()
}
</script>

<style lang="scss" scoped>
.container {
  height: 100vh;
  background-color: #f8f9fa;
  display: flex;
  flex-direction: column;
}

.header {
  background: white;
  border-bottom: 1rpx solid #e5e7eb;
}

.content {
  flex: 1;
  overflow: hidden;
}

.scroll-content {
  height: 100%;
}

.article {
  padding: 32rpx;
  background: white;
  margin: 16rpx;
  border-radius: 12rpx;
  line-height: 1.6;
}

.article-header {
  text-align: center;
  margin-bottom: 40rpx;
  padding-bottom: 24rpx;
  border-bottom: 2rpx solid #e5e7eb;
  
  .article-title {
    display: block;
    font-size: 36rpx;
    font-weight: 700;
    color: #1f2937;
    margin-bottom: 16rpx;
  }
  
  .article-date {
    font-size: 24rpx;
    color: #6b7280;
  }
}

.article-body {
  .section {
    margin-bottom: 32rpx;
    
    .section-title {
      display: block;
      font-size: 32rpx;
      font-weight: 600;
      color: #1f2937;
      margin-bottom: 16rpx;
    }
    
    .section-content {
      font-size: 28rpx;
      color: #374151;
      line-height: 1.8;
    }
  }
}

.article-footer {
  margin-top: 40rpx;
  padding-top: 24rpx;
  border-top: 2rpx solid #e5e7eb;
  text-align: center;
  
  .footer-text {
    display: block;
    font-size: 24rpx;
    color: #6b7280;
    margin-bottom: 8rpx;
  }
  
  .footer-date {
    font-size: 22rpx;
    color: #9ca3af;
  }
}
</style>