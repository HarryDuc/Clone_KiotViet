import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Message {
  @Prop()
  platformMessageId: string;

  @Prop()
  sender: string;

  @Prop()
  content: string;

  @Prop()
  type: string;

  @Prop([String])
  attachments: string[];

  @Prop()
  createdAt: Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message);

@Schema({ timestamps: true })
export class SocialMediaConversation extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Stores', required: true })
  storeId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'SalesChannels', required: true })
  channelId: Types.ObjectId;

  @Prop()
  platformConversationId: string;

  @Prop({
    type: {
      platformUserId: String,
      name: String,
      avatar: String,
      phone: String,
      email: String,
    },
  })
  customer: {
    platformUserId: string;
    name: string;
    avatar: string;
    phone: string;
    email: string;
  };

  @Prop({ enum: ['Tin nhắn trực tiếp', 'Bình luận', 'Đánh giá', 'Khiếu nại'], required: true })
  type: string;

  @Prop({ enum: ['Mới', 'Đang xử lý', 'Đã hoàn thành', 'Đã đóng'], default: 'Mới' })
  status: string;

  @Prop({ enum: ['Thấp', 'Trung bình', 'Cao', 'Khẩn cấp'], default: 'Trung bình' })
  priority: string;

  @Prop({ type: Types.ObjectId, ref: 'Employees' })
  assignedTo: Types.ObjectId;

  @Prop({ type: [MessageSchema] })
  messages: Message[];

  @Prop([String])
  tags: string[];

  @Prop([String])
  notes: string[];

  @Prop({
    type: [{ orderId: { type: Types.ObjectId, ref: 'Orders' }, orderCode: String }],
  })
  relatedOrders: { orderId: Types.ObjectId; orderCode: string }[];

  @Prop({
    type: [{ productId: { type: Types.ObjectId, ref: 'Products' }, name: String }],
  })
  relatedProducts: { productId: Types.ObjectId; name: string }[];

  @Prop({
    type: {
      responseTime: Number,
      resolutionTime: Number,
      customerSatisfaction: Number,
    },
  })
  metrics: {
    responseTime: number;
    resolutionTime: number;
    customerSatisfaction: number;
  };
}

export const SocialMediaConversationSchema = SchemaFactory.createForClass(SocialMediaConversation);

SocialMediaConversationSchema.index({ storeId: 1 });
SocialMediaConversationSchema.index({ channelId: 1 });
SocialMediaConversationSchema.index({ status: 1 });
SocialMediaConversationSchema.index({ assignedTo: 1 });
SocialMediaConversationSchema.index({ 'customer.platformUserId': 1 });
SocialMediaConversationSchema.index({ createdAt: 1 });