// Photo Categories
export enum PhotoCategory {
  PROFESSIONAL = "professional", // 专业职场照
  BLACK_WHITE_ART = "black_white_art", // 黑白艺术照
  ID_PHOTO = "id_photo", // 证件照
  WECHAT_PORTRAIT = "wechat_portrait", // 微信头像
}

// Photo Processing Jobs
export interface PhotoJob {
  id: string
  originalImageUrl: string
  category: PhotoCategory
  status: "processing" | "completed" | "failed"
  watermarkedImages: string[] // Array of watermarked image URLs
  highResImages: string[] // Array of high-res image URLs
  isPaid: boolean
  createdAt: string
  completedAt?: string
}

// Create Photo Job Request
export interface CreatePhotoJobRequest {
  originalImageUrl: string
  category: PhotoCategory
}

// Payment Records
export interface Payment {
  id: string
  jobId: string
  amount: string // Amount in CNY
  status: "pending" | "completed" | "failed"
  paymentMethod: string
  transactionId?: string
  createdAt: string
  paidAt?: string
}

// Create Payment Request
export interface CreatePaymentRequest {
  jobId: string
  amount: string
  paymentMethod: string
}

// Sample Images
export interface SampleImage {
  id: string
  category: PhotoCategory
  imageUrl: string
  isMainImage: boolean // Large preview image
  displayOrder: number
}

// Create Sample Image Request
export interface CreateSampleImageRequest {
  category: PhotoCategory
  imageUrl: string
  isMainImage: boolean
  displayOrder: number
}

// Photo categories data
export const photoCategories = [
  {
    id: PhotoCategory.PROFESSIONAL,
    name: "专业职场照"
  },
  {
    id: PhotoCategory.BLACK_WHITE_ART, 
    name: "黑白艺术照"
  },
  {
    id: PhotoCategory.ID_PHOTO,
    name: "证件照"
  },
  {
    id: PhotoCategory.WECHAT_PORTRAIT,
    name: "微信头像框"
  }
]

// Gender options
export const genderOptions = [
  { id: "male", name: "男性", icon: "♂" },
  { id: "female", name: "女性", icon: "♀" }
]

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

// Upload Response
export interface UploadResponse {
  url: string
  filename: string
}

// WeChat Frame
export interface WeChatFrame {
  id: string
  name: string
  imageUrl: string
  preview?: string
}