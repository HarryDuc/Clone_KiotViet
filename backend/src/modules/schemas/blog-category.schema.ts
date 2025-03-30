import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class BlogCategory extends Document {
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

  @Prop({ enum: ['Đang hoạt động', 'Ngừng hoạt động'], default: 'Đang hoạt động' })
  status: string;

  @Prop({
    type: {
      metaTitle: String,
      metaDescription: String,
    },
  })
  seo: {
    metaTitle: string;
    metaDescription: string;
  };
}

export const BlogCategorySchema = SchemaFactory.createForClass(BlogCategory);

BlogCategorySchema.index({ storeId: 1 });
BlogCategorySchema.index({ slug: 1 }, { unique: true });
BlogCategorySchema.index({ parentCategory: 1 });
BlogCategorySchema.index({ status: 1 });
BlogCategorySchema.index({ order: 1 });