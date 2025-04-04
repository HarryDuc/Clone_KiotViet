import mongoose from "mongoose";

const liveStreamSchema = new mongoose.Schema({
  // ID gian hàng
  storeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Stores",
    required: true,
  },
  // ID kênh livestream
  channelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SalesChannels",
    required: true,
  },
  // Tiêu đề livestream
  title: { type: String, required: true },
  // Mô tả
  description: { type: String },
  // Ảnh thumbnail
  thumbnail: { type: String },
  // Thời gian bắt đầu dự kiến
  scheduledStartTime: { type: Date, required: true },
  // Thời gian bắt đầu thực tế
  actualStartTime: { type: Date },
  // Thời gian kết thúc
  endTime: { type: Date },
  // Thời lượng (phút)
  duration: { type: Number },
  // Trạng thái livestream
  status: {
    type: String,
    enum: ["Đã lên lịch", "Đang phát", "Đã kết thúc", "Đã hủy"],
    default: "Đã lên lịch",
  },
  // Sản phẩm hiển thị
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products",
      },
      name: { type: String },
      price: { type: Number },
      discount: { type: Number },
      stock: { type: Number },
      order: { type: Number }, // Thứ tự hiển thị
    },
  ],
  // Khuyến mãi
  promotions: [
    {
      type: { type: String }, // Loại khuyến mãi
      value: { type: Number }, // Giá trị khuyến mãi
      description: { type: String }, // Mô tả
      startTime: { type: Date }, // Thời gian bắt đầu
      endTime: { type: Date }, // Thời gian kết thúc
    },
  ],
  // Tương tác người xem
  engagement: {
    viewers: { type: Number, default: 0 }, // Số người xem
    likes: { type: Number, default: 0 }, // Số lượt thích
    comments: { type: Number, default: 0 }, // Số bình luận
    shares: { type: Number, default: 0 }, // Số lượt chia sẻ
    peakViewers: { type: Number, default: 0 }, // Số người xem cao nhất
  },
  // Doanh số
  sales: {
    orders: { type: Number, default: 0 }, // Số đơn hàng
    totalRevenue: { type: Number, default: 0 }, // Tổng doanh thu
    averageOrderValue: { type: Number, default: 0 }, // Giá trị đơn hàng trung bình
  },
  // Bình luận
  comments: [
    {
      userId: { type: String }, // ID người dùng
      userName: { type: String }, // Tên người dùng
      content: { type: String }, // Nội dung
      timestamp: { type: Date }, // Thời gian
      isPinned: { type: Boolean, default: false }, // Được ghim
    },
  ],
  // Ghi hình
  recording: {
    url: { type: String }, // URL video
    duration: { type: Number }, // Thời lượng
    size: { type: Number }, // Kích thước file
    format: { type: String }, // Định dạng
  },
  // Phân tích
  analytics: {
    viewerRetention: { type: Number }, // Tỷ lệ giữ chân người xem
    engagementRate: { type: Number }, // Tỷ lệ tương tác
    conversionRate: { type: Number }, // Tỷ lệ chuyển đổi
    topProducts: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Products",
        },
        sales: { type: Number },
        revenue: { type: Number },
      },
    ],
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Tạo indexes để tối ưu truy vấn
liveStreamSchema.index({ storeId: 1 });
liveStreamSchema.index({ channelId: 1 });
liveStreamSchema.index({ status: 1 });
liveStreamSchema.index({ scheduledStartTime: 1 });
liveStreamSchema.index({ "products.productId": 1 });
liveStreamSchema.index({ "sales.totalRevenue": 1 });

export default mongoose.model("LiveStreams", liveStreamSchema);
