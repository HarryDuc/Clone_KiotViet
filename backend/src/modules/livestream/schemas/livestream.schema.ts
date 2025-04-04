import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ collection: 'LiveStreams' })
export class LiveStream extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Stores', required: true })
  storeId: Types.ObjectId; // Mã cửa hàng

  @Prop({ type: Types.ObjectId, ref: 'SalesChannels', required: true })
  channelId: Types.ObjectId; // Mã kênh bán hàng

  @Prop({ required: true })
  title: string; // Tiêu đề livestream

  @Prop()
  description: string; // Mô tả

  @Prop()
  thumbnail: string; // Ảnh đại diện

  @Prop({ required: true })
  scheduledStartTime: Date; // Thời gian bắt đầu dự kiến

  @Prop()
  actualStartTime: Date; // Thời gian bắt đầu thực tế

  @Prop()
  endTime: Date; // Thời gian kết thúc

  @Prop()
  duration: number; // Thời lượng (phút)

  @Prop({ enum: ['scheduled', 'live', 'ended', 'cancelled'], default: 'scheduled' })
  status: string; // Trạng thái

  @Prop({ type: [{ productId: Types.ObjectId, name: String, price: Number, discount: Number, stock: Number, order: Number }] })
  products: { productId: Types.ObjectId; name: string; price: number; discount: number; stock: number; order: number }[]; // Sản phẩm trong livestream

  @Prop({ type: [{ type: String, value: Number, description: String, startTime: Date, endTime: Date }] })
  promotions: { type: string; value: number; description: string; startTime: Date; endTime: Date }[]; // Khuyến mãi

  @Prop({ type: { viewers: Number, likes: Number, comments: Number, shares: Number, peakViewers: Number } })
  engagement: {
    viewers: number; // Số người xem
    likes: number; // Lượt thích
    comments: number; // Bình luận
    shares: number; // Chia sẻ
    peakViewers: number; // Số người xem cao nhất
  };

  @Prop({ type: { orders: Number, totalRevenue: Number, averageOrderValue: Number } })
  sales: {
    orders: number; // Số đơn hàng
    totalRevenue: number; // Doanh thu
    averageOrderValue: number; // Giá trị trung bình đơn hàng
  };

  @Prop({ type: [{ userId: String, userName: String, content: String, timestamp: Date, isPinned: Boolean }] })
  comments: { userId: string; userName: string; content: string; timestamp: Date; isPinned: boolean }[]; // Bình luận

  @Prop({ type: { url: String, duration: Number, size: Number, format: String } })
  recording: {
    url: string; // Đường dẫn bản ghi
    duration: number; // Thời lượng
    size: number; // Kích thước
    format: string; // Định dạng
  };

  @Prop({ type: { viewerRetention: Number, engagementRate: Number, conversionRate: Number, topProducts: [{ productId: Types.ObjectId, sales: Number, revenue: Number }] } })
  analytics: {
    viewerRetention: number; // Tỷ lệ giữ chân người xem
    engagementRate: number; // Tỷ lệ tương tác
    conversionRate: number; // Tỷ lệ chuyển đổi
    topProducts: { productId: Types.ObjectId; sales: number; revenue: number }[]; // Sản phẩm bán chạy
  };
}

export const LiveStreamSchema = SchemaFactory.createForClass(LiveStream);