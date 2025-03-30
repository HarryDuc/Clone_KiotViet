import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type SocialMediaPostDocument = SocialMediaPost & Document;

@Schema({ timestamps: true })
export class SocialMediaPost {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Store', required: true })
  storeId: MongooseSchema.Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'SalesChannel', required: true })
  channelId: MongooseSchema.Types.ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop()
  content: string;

  @Prop([{
    type: { type: String, enum: ['image', 'video', 'link'] },
    url: String,
    caption: String
  }])
  media: Array<{
    type: string;
    url: string;
    caption: string;
  }>;

  @Prop({
    isScheduled: { type: Boolean, default: false },
    scheduledTime: Date,
    timezone: String
  })
  schedule: {
    isScheduled: boolean;
    scheduledTime: Date;
    timezone: string;
  };

  @Prop({
    likes: { type: Number, default: 0 },
    comments: { type: Number, default: 0 },
    shares: { type: Number, default: 0 },
    views: { type: Number, default: 0 }
  })
  engagement: {
    likes: number;
    comments: number;
    shares: number;
    views: number;
  };

  @Prop([{
    productId: { type: MongooseSchema.Types.ObjectId, ref: 'Product' },
    name: String,
    price: Number,
    discount: Number
  }])
  products: Array<{
    productId: MongooseSchema.Types.ObjectId;
    name: string;
    price: number;
    discount: number;
  }>;

  @Prop([String])
  hashtags: string[];

  @Prop([String])
  mentions: string[];

  @Prop({
    type: String,
    enum: ['Bản nháp', 'Đã lên lịch', 'Đã đăng', 'Đã hủy', 'Lỗi'],
    default: 'Bản nháp'
  })
  status: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Employee' })
  postedBy: MongooseSchema.Types.ObjectId;

  @Prop()
  postedAt: Date;

  @Prop()
  platformPostId: string;

  @Prop()
  platformPostUrl: string;

  @Prop()
  platform: string;
}

export const SocialMediaPostSchema = SchemaFactory.createForClass(SocialMediaPost);

// Add indexes
SocialMediaPostSchema.index({ storeId: 1 });
SocialMediaPostSchema.index({ channelId: 1 });
SocialMediaPostSchema.index({ 'schedule.scheduledTime': 1 });
SocialMediaPostSchema.index({ status: 1 });