import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Branch } from './branch.schema';
import { BlogCategory } from './blog-category.schema';
import { Employee } from './employee.schema';
import { User } from './user.schema';

export type BlogPostDocument = BlogPost & Document;

@Schema({ timestamps: true })
export class BlogPost {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Stores', required: true })
  storeId: Branch;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true, unique: true })
  slug: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'BlogCategories' })
  category: BlogCategory;

  @Prop()
  thumbnail: string;

  @Prop()
  content: string;

  @Prop()
  excerpt: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Employees' })
  author: Employee;

  @Prop({ type: [String] })
  tags: string[];

  @Prop({
    type: String,
    enum: ['Bản nháp', 'Đã xuất bản', 'Đã lưu trữ'],
    default: 'Bản nháp'
  })
  status: string;

  @Prop()
  publishedAt: Date;

  @Prop({ default: 0 })
  views: number;

  @Prop({ default: 0 })
  likes: number;

  @Prop({
    type: [{
      user: { type: MongooseSchema.Types.ObjectId, ref: 'Users' },
      content: String,
      createdAt: { type: Date, default: Date.now }
    }]
  })
  comments: Array<{
    user: User;
    content: string;
    createdAt: Date;
  }>;

  @Prop({ type: Object })
  seo: {
    metaTitle: string;
    metaDescription: string;
    ogImage: string;
  };
}

export const BlogPostSchema = SchemaFactory.createForClass(BlogPost);

// Add indexes
BlogPostSchema.index({ storeId: 1 });
BlogPostSchema.index({ slug: 1 }, { unique: true });
BlogPostSchema.index({ category: 1 });
BlogPostSchema.index({ status: 1 });
BlogPostSchema.index({ publishedAt: 1 });
BlogPostSchema.index({ tags: 1 });