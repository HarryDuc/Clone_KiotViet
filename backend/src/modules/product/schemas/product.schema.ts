import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Categories } from '../../category/schemas/categories.schema';
import { Brand } from '../../brand/schemas/brand.schema';

@Schema({ timestamps: true, collection: 'Products' })
export class Product extends Document {
  @Prop({ unique: true, required: true })
  productId: string; // Mã sản phẩm duy nhất

  @Prop()
  barcode: string; // Mã vạch sản phẩm

  @Prop({ required: true })
  name: string; // Tên sản phẩm

  @Prop({ type: Types.ObjectId, ref: 'Categories' })
  category: Types.ObjectId; // Liên kết với danh mục sản phẩm

  @Prop({ type: Types.ObjectId, ref: 'Brands' })
  brand: Types.ObjectId; // Liên kết với thương hiệu

  @Prop({ required: true })
  price: number; // Giá bán

  @Prop()
  cost: number; // Giá vốn

  @Prop({ default: 0 })
  stock: number; // Số lượng tồn kho hiện tại

  @Prop()
  location: string; // Vị trí lưu trữ trong kho

  @Prop()
  minStock: number; // Số lượng tồn kho tối thiểu

  @Prop()
  maxStock: number; // Số lượng tồn kho tối đa

  @Prop({ enum: ['Cho phép kinh doanh', 'Ngừng kinh doanh'], default: 'Cho phép kinh doanh' })
  status: string; // Trạng thái kinh doanh của sản phẩm

  @Prop()
  image: string; // Đường dẫn ảnh sản phẩm

  @Prop()
  weight: number; // Trọng lượng sản phẩm

  @Prop()
  unit: string; // Đơn vị tính

  @Prop()
  description: string; // Mô tả sản phẩm
}

export const ProductSchema = SchemaFactory.createForClass(Product);