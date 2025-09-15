import {
  type PhotoJob,
  type InsertPhotoJob,
  type Payment,
  type InsertPayment,
  type SampleImage,
  type InsertSampleImage,
  PhotoCategory
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Photo Jobs
  createPhotoJob(job: InsertPhotoJob): Promise<PhotoJob>;
  getPhotoJob(id: string): Promise<PhotoJob | undefined>;
  updatePhotoJobStatus(id: string, status: "processing" | "completed" | "failed"): Promise<void>;
  updatePhotoJobImages(id: string, watermarked: string[], highRes: string[]): Promise<void>;
  markPhotoJobPaid(id: string): Promise<void>;

  // Payments
  createPayment(payment: InsertPayment): Promise<Payment>;
  getPayment(id: string): Promise<Payment | undefined>;
  updatePaymentStatus(id: string, status: "pending" | "completed" | "failed", transactionId?: string): Promise<void>;
  getPaymentByJobId(jobId: string): Promise<Payment | undefined>;

  // Sample Images
  createSampleImage(image: InsertSampleImage): Promise<SampleImage>;
  getSampleImagesByCategory(category: PhotoCategory): Promise<SampleImage[]>;
  getAllSampleImages(): Promise<SampleImage[]>;
}

export class MemStorage implements IStorage {
  private photoJobs: Map<string, PhotoJob>;
  private payments: Map<string, Payment>;
  private sampleImages: Map<string, SampleImage>;

  constructor() {
    this.photoJobs = new Map();
    this.payments = new Map();
    this.sampleImages = new Map();
    
    // Initialize with sample data
    this.initializeSampleData();
  }

  private initializeSampleData() {
    // Add sample images for each category from the attached assets
    const sampleData = [
      // Professional category
      { category: PhotoCategory.PROFESSIONAL, imageUrl: "/attached_assets/Professional_1757964490453.png", isMainImage: true, displayOrder: 0 },
      // Black & White Art category  
      { category: PhotoCategory.BLACK_WHITE_ART, imageUrl: "/attached_assets/BlackAndWhite-Art_1757964490451.png", isMainImage: true, displayOrder: 0 },
      // ID Photo category
      { category: PhotoCategory.ID_PHOTO, imageUrl: "/attached_assets/ID-Photo_1757964490452.png", isMainImage: true, displayOrder: 0 },
      // WeChat Portrait category
      { category: PhotoCategory.WECHAT_PORTRAIT, imageUrl: "/attached_assets/Wehchat-Portrait_1757964490454.png", isMainImage: true, displayOrder: 0 },
    ];

    for (const sample of sampleData) {
      const id = randomUUID();
      const image: SampleImage = {
        ...sample,
        id,
        isMainImage: sample.isMainImage ?? false,
        displayOrder: sample.displayOrder ?? 0,
      };
      this.sampleImages.set(id, image);
    }
  }

  // Photo Jobs
  async createPhotoJob(insertJob: InsertPhotoJob): Promise<PhotoJob> {
    const id = randomUUID();
    const job: PhotoJob = {
      ...insertJob,
      id,
      status: "processing",
      watermarkedImages: [],
      highResImages: [],
      isPaid: false,
      createdAt: new Date(),
      completedAt: null,
    };
    this.photoJobs.set(id, job);
    return job;
  }

  async getPhotoJob(id: string): Promise<PhotoJob | undefined> {
    return this.photoJobs.get(id);
  }

  async updatePhotoJobStatus(id: string, status: "processing" | "completed" | "failed"): Promise<void> {
    const job = this.photoJobs.get(id);
    if (!job) {
      throw new Error(`Photo job with id ${id} not found`);
    }
    job.status = status;
    if (status === "completed") {
      job.completedAt = new Date();
    }
    this.photoJobs.set(id, job);
  }

  async updatePhotoJobImages(id: string, watermarked: string[], highRes: string[]): Promise<void> {
    const job = this.photoJobs.get(id);
    if (!job) {
      throw new Error(`Photo job with id ${id} not found`);
    }
    job.watermarkedImages = watermarked;
    job.highResImages = highRes;
    this.photoJobs.set(id, job);
  }

  async markPhotoJobPaid(id: string): Promise<void> {
    const job = this.photoJobs.get(id);
    if (!job) {
      throw new Error(`Photo job with id ${id} not found`);
    }
    job.isPaid = true;
    this.photoJobs.set(id, job);
  }

  // Payments
  async createPayment(insertPayment: InsertPayment): Promise<Payment> {
    // Verify job exists
    const job = this.photoJobs.get(insertPayment.jobId);
    if (!job) {
      throw new Error(`Photo job with id ${insertPayment.jobId} not found`);
    }
    
    const id = randomUUID();
    const payment: Payment = {
      ...insertPayment,
      id,
      status: "pending",
      transactionId: null,
      createdAt: new Date(),
      paidAt: null,
      paymentMethod: insertPayment.paymentMethod ?? "wechat_pay",
    };
    this.payments.set(id, payment);
    return payment;
  }

  async getPayment(id: string): Promise<Payment | undefined> {
    return this.payments.get(id);
  }

  async updatePaymentStatus(id: string, status: "pending" | "completed" | "failed", transactionId?: string): Promise<void> {
    const payment = this.payments.get(id);
    if (!payment) {
      throw new Error(`Payment with id ${id} not found`);
    }
    payment.status = status;
    if (transactionId) {
      payment.transactionId = transactionId;
    }
    if (status === "completed") {
      payment.paidAt = new Date();
    }
    this.payments.set(id, payment);
  }

  async getPaymentByJobId(jobId: string): Promise<Payment | undefined> {
    return Array.from(this.payments.values()).find(payment => payment.jobId === jobId);
  }

  // Sample Images
  async createSampleImage(insertImage: InsertSampleImage): Promise<SampleImage> {
    const id = randomUUID();
    const image: SampleImage = {
      ...insertImage,
      id,
      isMainImage: insertImage.isMainImage ?? false,
      displayOrder: insertImage.displayOrder ?? 0,
    };
    this.sampleImages.set(id, image);
    return image;
  }

  async getSampleImagesByCategory(category: PhotoCategory): Promise<SampleImage[]> {
    return Array.from(this.sampleImages.values())
      .filter(image => image.category === category)
      .sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0));
  }

  async getAllSampleImages(): Promise<SampleImage[]> {
    return Array.from(this.sampleImages.values())
      .sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0));
  }
}

export const storage = new MemStorage();
