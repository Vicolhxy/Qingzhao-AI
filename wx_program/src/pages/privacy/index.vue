<template>
  <view class="container">
    <!-- Header -->
    <view class="header">
      <u-navbar 
        title="隐私政策"
        left-icon="arrow-left"
        @left-click="handleBack"
      />
    </view>

    <!-- Content -->
    <view class="content">
      <scroll-view class="scroll-content" scroll-y>
        <view class="article">
          <view class="article-header">
            <text class="article-title">AI照片处理隐私政策</text>
            <text class="article-date">生效日期：2024年1月1日</text>
          </view>

          <view class="article-body">
            <view class="section">
              <text class="section-title">引言</text>
              <text class="section-content">
                AI照片处理（以下简称"我们"）非常重视用户的隐私保护。本隐私政策说明了我们如何收集、使用、存储和保护您的个人信息。请您仔细阅读本政策，以了解我们对您个人信息的处理方式。
              </text>
            </view>

            <view class="section">
              <text class="section-title">1. 信息收集</text>
              <text class="section-content">
                1.1 您主动提供的信息：
                <br/>• 您上传的照片
                <br/>• 您选择的照片处理类型和参数
                <br/>• 您的使用偏好设置
                <br/><br/>1.2 自动收集的信息：
                <br/>• 设备信息（设备型号、操作系统版本）
                <br/>• 应用使用情况（功能使用频率、停留时间）
                <br/>• 错误日志和性能数据
              </text>
            </view>

            <view class="section">
              <text class="section-title">2. 信息使用</text>
              <text class="section-content">
                我们收集您的信息用于以下目的：
                <br/>2.1 提供照片处理服务
                <br/>2.2 改进我们的AI算法和服务质量
                <br/>2.3 提供客户支持
                <br/>2.4 防止欺诈和滥用
                <br/>2.5 遵守法律法规要求
              </text>
            </view>

            <view class="section">
              <text class="section-title">3. 照片处理与存储</text>
              <text class="section-content">
                3.1 照片处理：您上传的照片仅用于您请求的处理服务
                <br/>3.2 临时存储：原始照片在处理期间临时存储在安全服务器上
                <br/>3.3 自动删除：处理完成后，原始照片将在24小时内自动删除
                <br/>3.4 结果保存：处理结果照片在您明确删除前保留，以便您随时查看和下载
                <br/>3.5 安全措施：所有照片数据均采用加密传输和存储
              </text>
            </view>

            <view class="section">
              <text class="section-title">4. 信息共享</text>
              <text class="section-content">
                我们承诺不会出售、交易或以其他方式转让您的个人信息给第三方，除非：
                <br/>4.1 获得您的明确同意
                <br/>4.2 为提供服务而必须与我们的技术服务提供商共享
                <br/>4.3 法律法规要求或政府部门要求
                <br/>4.4 为保护我们或他人的合法权益
              </text>
            </view>

            <view class="section">
              <text class="section-title">5. 第三方服务</text>
              <text class="section-content">
                5.1 我们可能使用第三方服务来提供部分功能（如支付处理、云存储）
                <br/>5.2 这些第三方服务商均已签署数据保护协议
                <br/>5.3 我们仅向第三方提供提供服务所必需的最少信息
                <br/>5.4 我们会要求第三方按照本隐私政策保护您的信息
              </text>
            </view>

            <view class="section">
              <text class="section-title">6. 数据安全</text>
              <text class="section-content">
                6.1 我们采用行业标准的安全措施保护您的信息
                <br/>6.2 数据传输使用SSL/TLS加密
                <br/>6.3 服务器存储使用AES-256加密
                <br/>6.4 定期进行安全审计和漏洞扫描
                <br/>6.5 严格限制员工对用户数据的访问权限
              </text>
            </view>

            <view class="section">
              <text class="section-title">7. 您的权利</text>
              <text class="section-content">
                根据相关法律法规，您享有以下权利：
                <br/>7.1 查看我们收集的您的个人信息
                <br/>7.2 要求更正不准确的个人信息
                <br/>7.3 要求删除您的个人信息
                <br/>7.4 撤回您已给予的同意
                <br/>7.5 投诉数据处理相关问题
              </text>
            </view>

            <view class="section">
              <text class="section-title">8. 儿童隐私</text>
              <text class="section-content">
                8.1 我们的服务主要面向成年用户
                <br/>8.2 我们不会故意收集14岁以下儿童的个人信息
                <br/>8.3 如发现收集了儿童信息，我们将立即删除
                <br/>8.4 如果您是儿童的监护人，请监督儿童的应用使用
              </text>
            </view>

            <view class="section">
              <text class="section-title">9. 跨境数据传输</text>
              <text class="section-content">
                9.1 您的数据主要存储在中国境内的服务器上
                <br/>9.2 如需跨境传输，我们将严格遵守相关法律法规
                <br/>9.3 确保接收方提供足够的数据保护水平
              </text>
            </view>

            <view class="section">
              <text class="section-title">10. 政策更新</text>
              <text class="section-content">
                10.1 我们可能会不时更新本隐私政策
                <br/>10.2 重大变更将通过应用内通知或其他方式告知您
                <br/>10.3 继续使用我们的服务表示您接受更新后的政策
                <br/>10.4 您可以随时查看最新版本的隐私政策
              </text>
            </view>

            <view class="section">
              <text class="section-title">11. 联系我们</text>
              <text class="section-content">
                如果您对本隐私政策有任何疑问、意见或投诉，请通过以下方式联系我们：
                <br/>• 应用内客服功能
                <br/>• 邮箱：privacy@example.com
                <br/>• 我们将在收到您的问询后尽快回复
              </text>
            </view>
          </view>

          <view class="article-footer">
            <text class="footer-text">本隐私政策最终解释权归AI照片处理所有</text>
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