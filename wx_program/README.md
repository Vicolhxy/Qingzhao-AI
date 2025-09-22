# AI照片处理微信小程序

基于Vue3 + UniApp开发的AI照片处理微信小程序版本。

## 项目特性

- ✅ Vue3 Composition API + `<script setup>` 语法
- ✅ Vite 构建工具 + TypeScript
- ✅ uView UI 组件库
- ✅ 微信小程序原生能力支持
- ✅ 完整的照片处理流程
- ✅ 响应式设计

## 项目结构

```
wx_program/
├── src/
│   ├── pages/           # 页面文件
│   │   ├── home/        # 首页
│   │   ├── upload/      # 上传页面
│   │   ├── generating/  # 生成页面
│   │   ├── result/      # 结果页面
│   │   ├── terms/       # 用户协议
│   │   └── privacy/     # 隐私政策
│   ├── components/      # 公共组件
│   ├── api/            # API接口
│   ├── utils/          # 工具函数
│   ├── shared/         # 共享类型定义
│   ├── static/         # 静态资源
│   ├── styles/         # 样式文件
│   ├── App.vue         # 应用入口
│   ├── main.ts         # 主文件
│   ├── pages.json      # 页面配置
│   └── manifest.json   # 应用配置
├── package.json        # 依赖配置
├── vite.config.ts      # Vite配置
└── tsconfig.json       # TypeScript配置
```

## 开发环境

```bash
# 进入项目目录
cd wx_program

# 安装依赖
npm install

# 微信小程序开发
npm run dev:mp-weixin

# 构建微信小程序
npm run build:mp-weixin
```

## 功能模块

### 1. 照片类型支持
- 专业职场照
- 黑白艺术照  
- 证件照
- 微信头像框

### 2. 核心功能
- 照片上传与预览
- AI照片生成
- 实时生成进度
- 结果展示与下载
- 支付功能集成

### 3. 微信小程序特性
- 微信头像获取
- 保存到相册
- 微信支付
- 原生体验

## 技术栈

- **框架**: Vue3 + UniApp
- **构建工具**: Vite
- **编程语言**: TypeScript
- **UI组件**: uView UI
- **状态管理**: Vue3 Reactivity API
- **网络请求**: uni.request 封装
- **开发规范**: ESLint + Prettier

## 部署说明

1. 使用微信开发者工具打开 `dist/dev/mp-weixin` 目录
2. 配置微信小程序 AppID
3. 上传代码到微信后台
4. 提交审核并发布

## 注意事项

- 需要配置微信小程序合法域名
- 图片上传需要HTTPS域名支持
- 支付功能需要微信商户号配置
- 用户头像获取需要用户授权

## API集成

项目已配置与现有后端API的集成：
- 照片上传接口
- 任务创建与查询
- 支付相关接口

请确保后端服务正常运行并配置正确的域名。