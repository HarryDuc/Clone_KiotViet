import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Comment {
  @Prop({ type: Types.ObjectId, ref: 'Users' })
  user: Types.ObjectId;

  @Prop()
  content: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);

@Schema({ timestamps: true })
export class BlogPost extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Stores', required: true })
  storeId: Types.ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true, unique: true })
  slug: string;

  @Prop({ type: Types.ObjectId, ref: 'BlogCategories' })
  category: Types.ObjectId;

  @Prop()
  thumbnail: string;

  @Prop()
  content: string;

  @Prop()
  excerpt: string;

  @Prop({ type: Types.ObjectId, ref: 'Employees' })
  author: Types.ObjectId;

  @Prop([String])
  tags: string[];

  @Prop({ enum: ['Bản nháp', 'Đã xuất bản', 'Đã lưu trữ'], default: 'Bản nháp' })
  status: string;

  @Prop()
  publishedAt: Date;

  @Prop({ default: 0 })
  views: number;

  @Prop({ default: 0 })
  likes: number;

  @Prop({ type: [CommentSchema] })
  comments: Comment[];

  @Prop({
    type: {
      metaTitle: String,
      metaDescription: String,
      ogImage: String,
    },
  })
  seo: {
    metaTitle: string;
    metaDescription: string;
    ogImage: string;
  };
}

export const BlogPostSchema = SchemaFactory.createForClass(BlogPost);

BlogPostSchema.index({ storeId: 1 });
BlogPostSchema.index({ slug: 1 }, { unique: true });
BlogPostSchema.index({ category: 1 });
BlogPostSchema.index({ status: 1 });
BlogPostSchema.index({ publishedAt: 1 });
BlogPostSchema.index({ tags: 1 });