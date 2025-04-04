import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ collection: 'Products' })
export class Product extends Document {
  @Prop({ unique: true, required: true })
  productId: string; // Mã sản phẩm

  @Prop({ unique: true })
  barcode: string; // Mã vạch

  @Prop({ required: true })
  name: string; // Tên sản phẩm

  @Prop({ type: Types.ObjectId, ref: 'Categories', required: true })
  category: Types.ObjectId; // Mã danh mục

  @Prop({ type: Types.ObjectId, ref: 'Brands', required: true })
  brand: Types.ObjectId; // Mã thương hiệu

  @Prop({ required: true })
  price: number; // Giá bán

  @Prop({ required: true })
  cost: number; // Giá vốn

  @Prop({ default: 0 })
  stock: number; // Tồn kho

  @Prop()
  location: string; // Vị trí kho

  @Prop({ default: 0 })
  minStock: number; // Tồn kho tối thiểu

  @Prop({ default: 100 })
  maxStock: number; // Tồn kho tối đa

  @Prop({ enum: ['active', 'inactive'], default: 'active' })
  status: string; // Trạng thái

  @Prop()
  image: string; // Ảnh

  @Prop()
  weight: number; // Trọng lượng

  @Prop({ required: true })
  unit: string; // Đơn vị

  @Prop()
  description: string; // Mô tả

  @Prop({ type: [String], default: [] })
  images: string[]; // Danh sách ảnh

  @Prop({ type: [{ userId: Types.ObjectId, rating: Number, comment: String, createdAt: Date }], default: [] })
  reviews: { userId: Types.ObjectId; rating: number; comment: string; createdAt: Date }[]; // Đánh giá
}

export const ProductSchema = SchemaFactory.createForClass(Product);