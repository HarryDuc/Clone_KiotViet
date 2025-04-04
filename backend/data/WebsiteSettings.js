import mongoose from "mongoose";

const websiteSettingsSchema = new mongoose.Schema({
  storeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Stores",
    required: true,
  },
  // Cài đặt chung
  siteName: { type: String, required: true },
  logo: { type: String },
  favicon: { type: String },
  description: { type: String },
  keywords: [{ type: String }],

  // Cài đặt liên hệ
  contact: {
    phone: { type: String },
    email: { type: String },
    address: { type: String },
    workingHours: { type: String },
  },

  // Cài đặt mạng xã hội
  socialMedia: {
    facebook: { type: String },
    instagram: { type: String },
    youtube: { type: String },
    tiktok: { type: String },
    zalo: { type: String },
  },

  // Cài đặt SEO
  seo: {
    metaTitle: { type: String },
    metaDescription: { type: String },
    ogImage: { type: String },
    robots: { type: String },
    sitemap: { type: Boolean, default: true },
  },

  // Cài đặt giao diện
  theme: {
    primaryColor: { type: String },
    secondaryColor: { type: String },
    fontFamily: { type: String },
    customCSS: { type: String },
  },

  // Cài đặt bảo mật
  security: {
    ssl: { type: Boolean, default: true },
    maintenanceMode: { type: Boolean, default: false },
    allowedIPs: [{ type: String }],
  },

  // Cài đặt tích hợp
  integrations: {
    googleAnalytics: { type: String },
    facebookPixel: { type: String },
    chatWidget: { type: Boolean, default: true },
  },

  status: {
    type: String,
    enum: ["Đang hoạt động", "Bảo trì", "Tạm ngưng"],
    default: "Đang hoạt động",
  },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Indexes
websiteSettingsSchema.index({ storeId: 1 });

export default mongoose.model("WebsiteSettings", websiteSettingsSchema);
