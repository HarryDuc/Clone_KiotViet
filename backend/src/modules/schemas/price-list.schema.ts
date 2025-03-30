import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class PriceListProduct {
  @Prop({ type: Types.ObjectId, ref: 'Products', required: true })
  productId: Types.ObjectId;

  @Prop({ required: true })
  price: number;

  @Prop({ default: 1 })
  minQuantity: number;

  @Prop()
  maxQuantity: number;

  @Prop({ default: 0 })
  discount: number;

  @Prop({ enum: ['Phần trăm', 'Số tiền'], default: 'Phần trăm' })
  discountType: string;
}

export const PriceListProductSchema = SchemaFactory.createForClass(PriceListProduct);

@Schema({ timestamps: true })
export class PriceList extends Document {
  @Prop({ unique: true })
  priceListId: string;

  @Prop({ type: Types.ObjectId, ref: 'Stores', required: true })
  storeId: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ enum: ['Bán lẻ', 'Bán buôn', 'Đại lý', 'Khuyến mãi'], required: true })
  type: string;

  @Prop({ enum: ['Đang hoạt động', 'Ngừng hoạt động'], default: 'Đang hoạt động' })
  status: string;

  @Prop()
  validFrom: Date;

  @Prop()
  validTo: Date;

  @Prop({ type: [PriceListProductSchema] })
  products: PriceListProduct[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'CustomerGroups' }] })
  customerGroups: Types.ObjectId[];

  @Prop({
    type: {
      minOrderValue: Number,
      maxOrderValue: Number,
      paymentMethods: [String],
      locations: [String],
    },
  })
  conditions: {
    minOrderValue: number;
    maxOrderValue: number;
    paymentMethods: string[];
    locations: string[];
  };
}

export const PriceListSchema = SchemaFactory.createForClass(PriceList);

PriceListSchema.index({ storeId: 1 });
PriceListSchema.index({ name: 1 });
PriceListSchema.index({ type: 1 });
PriceListSchema.index({ 'products.productId': 1 });