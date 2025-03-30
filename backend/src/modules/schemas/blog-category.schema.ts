import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Branch } from './branch.schema';

export type BlogCategoryDocument = BlogCategory & Document;

@Schema({ timestamps: true })
export class BlogCategory {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Stores', required: true })
  storeId: Branch;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  slug: string;

  @Prop()
  description: string;

  @Prop()
  thumbnail: string;

  @Prop({ type: Object })
  seo: {
    metaTitle: string;
    metaDescription: string;
    ogImage: string;
  };

  @Prop({ default: true })
  isActive: boolean;

  @Prop()
  note: string;
}

export const BlogCategorySchema = SchemaFactory.createForClass(BlogCategory);

// Add indexes
BlogCategorySchema.index({ storeId: 1 });
BlogCategorySchema.index({ slug: 1 }, { unique: true });