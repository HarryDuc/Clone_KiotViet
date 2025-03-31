import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Categories extends Document {
  @Prop({ unique: true })
  categoryId: string;

  @Prop({ required: true })
  name: string;

  @Prop({ type: Types.ObjectId, ref: 'Categories' })
  parentCategory: Types.ObjectId;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const CategoriesSchema = SchemaFactory.createForClass(Categories);