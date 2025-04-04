import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Media {
  @Prop({ enum: ['image', 'video', 'link'] })
  type: string;

  @Prop()
  url: string;

  @Prop()
  caption: string;
}

export const MediaSchema = SchemaFactory.createForClass(Media);

@Schema({ timestamps: true })
export class SocialMediaPost extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Stores', required: true })
  storeId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'SalesChannels', required: true })
  channelId: Types.ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop()
  content: string;

  @Prop({ type: [MediaSchema] })
  media: Media[];

  @Prop({
    type: {
      isScheduled: { type: Boolean, default: false },
      scheduledTime: Date,
      timezone: String,
    },
  })
  schedule: {
    isScheduled: boolean;
    scheduledTime: Date;
    timezone: string;
  };

  @Prop({
    type: {
      likes: { type: Number, default: 0 },
      comments: { type: Number, default: 0 },
      shares: { type: Number, default: 0 },
      views: { type: Number, default: 0 },
    },
  })
  engagement: {
    likes: number;
    comments: number;
    shares: number;
    views: number;
  };

  @Prop({
    type: [
      {
        productId: { type: Types.ObjectId, ref: 'Products' },
        name: String,
        price: Number,
        discount: Number,
      },
    ],
  })
  products: { productId: Types.ObjectId; name: string; price: number; discount: number }[];

  @Prop([String])
  hashtags: string[];

  @Prop([String])
  mentions: string[];

  @Prop({ enum: ['Bản nháp', 'Đã lên lịch', 'Đã đăng', 'Đã hủy', 'Lỗi'], default: 'Bản nháp' })
  status: string;

  @Prop({ type: Types.ObjectId, ref: 'Employees' })
  postedBy: Types.ObjectId;

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

SocialMediaPostSchema.index({ storeId: 1 });
SocialMediaPostSchema.index({ channelId: 1 });
SocialMediaPostSchema.index({ 'schedule.scheduledTime': 1 });
SocialMediaPostSchema.index({ status: 1 });