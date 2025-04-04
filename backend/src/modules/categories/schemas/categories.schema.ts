import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ collection: 'Categories' })
export class Categories extends Document {
  @Prop({ unique: true, required: true })
  categoryId: string; // Mã danh mục

  @Prop({ required: true })
  name: string; // Tên danh mục

  @Prop({ type: Types.ObjectId, ref: 'Categories' })
  parentCategory: Types.ObjectId; // Mã danh mục cha

  @Prop({ default: Date.now })
  createdAt: Date; // Thời gian tạo
}

export const CategoriesSchema = SchemaFactory.createForClass(Categories);