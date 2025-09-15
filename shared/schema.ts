import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer, boolean, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Photo Categories
export enum PhotoCategory {
  PROFESSIONAL = "professional", // 专业职业照
  BLACK_WHITE_ART = "black_white_art", // 黑白艺术照
  ID_PHOTO = "id_photo", // 证件照
  WECHAT_PORTRAIT = "wechat_portrait", // 微信头像
}

// Photo Processing Jobs
export const photoJobs = pgTable("photo_jobs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  originalImageUrl: text("original_image_url").notNull(),
  category: varchar("category").$type<PhotoCategory>().notNull(),
  status: varchar("status", { enum: ["processing", "completed", "failed"] }).notNull().default("processing"),
  watermarkedImages: text("watermarked_images").array().default([]), // Array of watermarked image URLs
  highResImages: text("high_res_images").array().default([]), // Array of high-res image URLs
  isPaid: boolean("is_paid").default(false),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
  completedAt: timestamp("completed_at"),
});

// Payment Records
export const payments = pgTable("payments", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  jobId: varchar("job_id").notNull().references(() => photoJobs.id),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(), // Amount in CNY
  status: varchar("status", { enum: ["pending", "completed", "failed"] }).notNull().default("pending"),
  paymentMethod: varchar("payment_method").notNull().default("wechat_pay"),
  transactionId: text("transaction_id"),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
  paidAt: timestamp("paid_at"),
});

// Sample Images for Categories
export const sampleImages = pgTable("sample_images", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  category: varchar("category").$type<PhotoCategory>().notNull(),
  imageUrl: text("image_url").notNull(),
  isMainImage: boolean("is_main_image").default(false), // Large preview image
  displayOrder: integer("display_order").default(0),
});

// Schema validation
export const insertPhotoJobSchema = createInsertSchema(photoJobs).pick({
  originalImageUrl: true,
  category: true,
}).extend({
  category: z.nativeEnum(PhotoCategory),
});

export const insertPaymentSchema = createInsertSchema(payments).pick({
  jobId: true,
  amount: true,
  paymentMethod: true,
});

export const insertSampleImageSchema = createInsertSchema(sampleImages).pick({
  category: true,
  imageUrl: true,
  isMainImage: true,
  displayOrder: true,
}).extend({
  category: z.nativeEnum(PhotoCategory),
});

// Types
export type PhotoJob = typeof photoJobs.$inferSelect;
export type InsertPhotoJob = z.infer<typeof insertPhotoJobSchema>;
export type Payment = typeof payments.$inferSelect;
export type InsertPayment = z.infer<typeof insertPaymentSchema>;
export type SampleImage = typeof sampleImages.$inferSelect;
export type InsertSampleImage = z.infer<typeof insertSampleImageSchema>;
