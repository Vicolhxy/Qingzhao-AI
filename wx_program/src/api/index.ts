import { get, post, uploadFile } from '@/utils/request'
import type { 
  PhotoJob, 
  CreatePhotoJobRequest, 
  Payment, 
  CreatePaymentRequest,
  SampleImage,
  ApiResponse,
  UploadResponse
} from '@/shared/types'

// 照片处理相关API
export const photoApi = {
  // 创建照片处理任务
  createJob: (data: CreatePhotoJobRequest) => 
    post<PhotoJob>('/photos/jobs', data),
  
  // 获取任务状态
  getJob: (jobId: string) => 
    get<PhotoJob>(`/photos/jobs/${jobId}`),
  
  // 获取样例图片
  getSampleImages: (category?: string) => 
    get<SampleImage[]>('/photos/samples', category ? { category } : undefined),
}

// 支付相关API
export const paymentApi = {
  // 创建支付订单
  createPayment: (data: CreatePaymentRequest) => 
    post<Payment>('/payments', data),
  
  // 获取支付状态
  getPayment: (paymentId: string) => 
    get<Payment>(`/payments/${paymentId}`),
}

// 文件上传API
export const uploadApi = {
  // 上传照片
  uploadPhoto: (filePath: string) => 
    uploadFile(filePath, 'photo'),
}

// 导出所有API
export default {
  ...photoApi,
  ...paymentApi,
  ...uploadApi,
}