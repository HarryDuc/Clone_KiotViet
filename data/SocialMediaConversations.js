import mongoose from "mongoose";

const socialMediaConversationSchema = new mongoose.Schema({
  // ID gian hàng
  storeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Stores",
    required: true,
  },
  // ID kênh mạng xã hội
  channelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SalesChannels",
    required: true,
  },
  // ID hội thoại trên nền tảng
  platformConversationId: { type: String },
  // Thông tin khách hàng
  customer: {
    platformUserId: { type: String }, // ID người dùng trên nền tảng
    name: { type: String }, // Tên người dùng
    avatar: { type: String }, // Ảnh đại diện
    phone: { type: String }, // Số điện thoại
    email: { type: String }, // Email
  },
  // Loại hội thoại
  type: {
    type: String,
    enum: ["Tin nhắn trực tiếp", "Bình luận", "Đánh giá", "Khiếu nại"],
    required: true,
  },
  // Trạng thái hội thoại
  status: {
    type: String,
    enum: ["Mới", "Đang xử lý", "Đã hoàn thành", "Đã đóng"],
    default: "Mới",
  },
  // Độ ưu tiên
  priority: {
    type: String,
    enum: ["Thấp", "Trung bình", "Cao", "Khẩn cấp"],
    default: "Trung bình",
  },
  // Nhân viên phụ trách
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employees",
  },
  // Nội dung hội thoại
  messages: [
    {
      platformMessageId: { type: String }, // ID tin nhắn trên nền tảng
      sender: { type: String }, // Người gửi
      content: { type: String }, // Nội dung
      type: { type: String }, // Loại tin nhắn
      attachments: [{ type: String }], // Tệp đính kèm
      createdAt: { type: Date }, // Thời gian gửi
    },
  ],
  // Nhãn phân loại
  tags: [{ type: String }],
  // Ghi chú
  notes: [{ type: String }],
  // Đơn hàng liên quan
  relatedOrders: [
    {
      orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Orders",
      },
      orderCode: { type: String },
    },
  ],
  // Sản phẩm liên quan
  relatedProducts: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products",
      },
      name: { type: String },
    },
  ],
  // Chỉ số hiệu suất
  metrics: {
    responseTime: { type: Number }, // Thời gian phản hồi (phút)
    resolutionTime: { type: Number }, // Thời gian giải quyết (phút)
    customerSatisfaction: { type: Number }, // Độ hài lòng của khách hàng
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Tạo indexes để tối ưu truy vấn
socialMediaConversationSchema.index({ storeId: 1 });
socialMediaConversationSchema.index({ channelId: 1 });
socialMediaConversationSchema.index({ status: 1 });
socialMediaConversationSchema.index({ assignedTo: 1 });
socialMediaConversationSchema.index({ "customer.platformUserId": 1 });
socialMediaConversationSchema.index({ createdAt: 1 });

export default mongoose.model(
  "SocialMediaConversations",
  socialMediaConversationSchema
);
