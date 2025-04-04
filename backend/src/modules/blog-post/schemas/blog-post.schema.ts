import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ collection: 'BlogPosts' })
export class BlogPost extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Stores', required: true })
  storeId: Types.ObjectId; // Mã cửa hàng

  @Prop({ required: true })
  title: string; // Tiêu đề

  @Prop({ required: true, unique: true })
  slug: string; // Đường dẫn tĩnh

  @Prop({ type: Types.ObjectId, ref: 'BlogCategories', required: true })
  category: Types.ObjectId; // Mã danh mục

  @Prop()
  thumbnail: string; // Ảnh đại diện

  @Prop({ required: true })
  content: string; // Nội dung

  @Prop()
  excerpt: string; // Đoạn trích

  @Prop({ type: Types.ObjectId, ref: 'Employees', required: true })
  author: Types.ObjectId; // Mã tác giả

  @Prop({ type: [String], default: [] })
  tags: string[]; // Thẻ tag

  @Prop({ enum: ['draft', 'published', 'archived'], default: 'draft' })
  status: string; // Trạng thái

  @Prop()
  publishedAt: Date; // Thời gian xuất bản

  @Prop({ default: 0 })
  views: number; // Lượt xem

  @Prop({ default: 0 })
  likes: number; // Lượt thích

  @Prop({ type: [{ user: { type: Types.ObjectId, ref: 'Users' }, content: String, createdAt: Date }], default: [] })
  comments: { user: Types.ObjectId; content: string; createdAt: Date }[]; // Bình luận

  @Prop({ type: { metaTitle: String, metaDescription: String, ogImage: String } })
  seo: {
    metaTitle: string; // Tiêu đề SEO
    metaDescription: string; // Mô tả SEO
    ogImage: string; // Ảnh Open Graph
  };

  @Prop()
  title_en?: string; // Tiêu đề tiếng Anh
}

export const BlogPostSchema = SchemaFactory.createForClass(BlogPost);