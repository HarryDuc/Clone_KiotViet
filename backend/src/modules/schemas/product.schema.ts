import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop({unique: true})
  productId: String;

  @Prop()
  barcode: String;

  @Prop({unique: true, required: true})
  name: String;

  @Prop({ required: true})
  price: Number; // Giá bán

  @Prop()
  cost: Number; // Giá von

  @Prop({ default: 0})
  stock: Number;

  @Prop()
  location: String;

  @Prop()
  minStock: Number;

  @Prop()
  maxStock: Number;;

  @Prop({enum: ["Cho phép kinh doanh", "Ngừng kinh doanh"], default: "Cho phép kinh doanh"})
  status: String;

  @Prop()
  image: String;

  @Prop()
  wetght: Number;

  @Prop()
  unit: String;

  @Prop()
  description: String;

  @Prop({type: Types.ObjectId, ref: "Categories", required: true})
  category: Types.ObjectId;

  @Prop({type: Types.ObjectId, ref: "Brands", required: true})
  brand: Types.ObjectId;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const BranchSchema = SchemaFactory.createForClass(Product);
