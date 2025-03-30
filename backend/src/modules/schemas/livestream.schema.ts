import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class LiveStreamProduct {
  @Prop({ type: Types.ObjectId, ref: 'Products' })
  productId: Types.ObjectId;

  @Prop()
  name: string;

  @Prop()
  price: number;

  @Prop()
  discount: number;

  @Prop()
  stock: number;

  @Prop()
  order: number;
}

export const LiveStreamProductSchema = SchemaFactory.createForClass(LiveStreamProduct);

@Schema()
export class Promotion {
  @Prop()
  type: string;

  @Prop()
  value: number;

  @Prop()
  description: string;

  @Prop()
  startTime: Date;

  @Prop()
  endTime: Date;
}

export const PromotionSchema = SchemaFactory.createForClass(Promotion);

@Schema()
export class Comment {
  @Prop()
  userId: string;

  @Prop()
  userName: string;

  @Prop()
  content: string;

  @Prop()
  timestamp: Date;

  @Prop({ default: false })
  isPinned: boolean;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);

@Schema({ timestamps: true })
export class LiveStream extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Stores', required: true })
  storeId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'SalesChannels', required: true })
  channelId: Types.ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop()
  thumbnail: string;

  @Prop({ required: true })
  scheduledStartTime: Date;

  @Prop()
  actualStartTime: Date;

  @Prop()
  endTime: Date;

  @Prop()
  duration: number;

  @Prop({ enum: ['Đã lên lịch', 'Đang phát', 'Đã kết thúc', 'Đã hủy'], default: 'Đã lên lịch' })
  status: string;

  @Prop({ type: [LiveStreamProductSchema] })
  products: LiveStreamProduct[];

  @Prop({ type: [PromotionSchema] })
  promotions: Promotion[];

  @Prop({
    type: {
      viewers: { type: Number, default: 0 },
      likes: { type: Number, default: 0 },
      comments: { type: Number, default: 0 },
      shares: { type: Number, default: 0 },
      peakViewers: { type: Number, default: 0 },
    },
  })
  engagement: {
    viewers: number;
    likes: number;
    comments: number;
    shares: number;
    peakViewers: number;
  };

  @Prop({
    type: {
      orders: { type: Number, default: 0 },
      totalRevenue: { type: Number, default: 0 },
      averageOrderValue: { type: Number, default: 0 },
    },
  })
  sales: {
    orders: number;
    totalRevenue: number;
    averageOrderValue: number;
  };

  @Prop({ type: [CommentSchema] })
  comments: Comment[];

  @Prop({
    type: {
      url: String,
      duration: Number,
      size: Number,
      format: String,
    },
  })
  recording: {
    url: string;
    duration: number;
    size: number;
    format: string;
  };

  @Prop({
    type: {
      viewerRetention: Number,
      engagementRate: Number,
      conversionRate: Number,
      topProducts: [{ productId: Types.ObjectId, sales: Number, revenue: Number }],
    },
  })
  analytics: {
    viewerRetention: number;
    engagementRate: number;
    conversionRate: number;
    topProducts: { productId: Types.ObjectId; sales: number; revenue: number }[];
  };
}

export const LiveStreamSchema = SchemaFactory.createForClass(LiveStream);

LiveStreamSchema.index({ storeId: 1 });
LiveStreamSchema.index({ channelId: 1 });
LiveStreamSchema.index({ status: 1 });
LiveStreamSchema.index({ scheduledStartTime: 1 });
LiveStreamSchema.index({ 'products.productId': 1 });
LiveStreamSchema.index({ 'sales.totalRevenue': 1 });