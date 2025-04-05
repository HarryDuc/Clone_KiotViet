import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ collection: 'BlogCategories' })
export class BlogCategories extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Stores', required: true })
  storeId: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  slug: string;

  @Prop()
  description: string;

  @Prop({ type: Types.ObjectId, ref: 'BlogCategories' })
  parentCategory: Types.ObjectId;

  @Prop({ default: 0 })
  order: number;

  @Prop({ enum: ['active', 'inactive'], default: 'active' })
  status: string;

  @Prop({ type: { metaTitle: String, metaDescription: String } })
  seo: { metaTitle: string; metaDescription: string };

  // Trường mới
  @Prop()
  name_en: string; // Tên tiếng Anh

  @Prop()
  description_en: string; // Mô tả tiếng Anh
}

export const BlogCategoriesSchema = SchemaFactory.createForClass(BlogCategories);