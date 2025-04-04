import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ collection: 'SocialMediaPosts' })
export class SocialMediaPost extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Stores', required: true })
  storeId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'SalesChannels', required: true })
  channelId: Types.ObjectId;

  @Prop({ required: true })
  platform: string;

  @Prop({ required: true })
  postId: string;

  @Prop({ required: true })
  content: string;

  @Prop([String])
  images: string[];

  @Prop({ type: [{ productId: Types.ObjectId }] })
  products: { productId: Types.ObjectId }[];

  @Prop({ type: Types.ObjectId, ref: 'Employees', required: true })
  postedBy: Types.ObjectId;

  @Prop({ required: true })
  postDate: Date;

  @Prop({ enum: ['draft', 'published', 'archived'], default: 'draft' })
  status: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  // Trường mới
  @Prop()
  scheduledDate: Date;

  @Prop({ type: { views: Number, likes: Number, comments: Number } })
  analytics: { views: number; likes: number; comments: number };
}

export const SocialMediaPostSchema = SchemaFactory.createForClass(SocialMediaPost);