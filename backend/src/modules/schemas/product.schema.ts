import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Categories } from './categories.schema';
import { Brand } from './brand.schema';

@Schema({ timestamps: true, collection: 'Products' })
export class Product extends Document {
  @Prop({ unique: true })
  productId: string;

  @Prop()
  barcode: string;

  @Prop({ required: true })
  name: string;

  @Prop({ type: Types.ObjectId, ref: 'Categories' })
  category: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Brands' })
  brand: Types.ObjectId;

  @Prop({ required: true })
  price: number;

  @Prop()
  cost: number;

  @Prop({ default: 0 })
  stock: number;

  @Prop()
  location: string;

  @Prop()
  minStock: number;

  @Prop()
  maxStock: number;

  @Prop({ enum: ['Cho phép kinh doanh', 'Ngừng kinh doanh'], default: 'Cho phép kinh doanh' })
  status: string;

  @Prop()
  image: string;

  @Prop()
  weight: number;

  @Prop()
  unit: string;

  @Prop()
  description: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);