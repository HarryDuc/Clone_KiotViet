import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ collection: 'PriceLists' })
export class PriceList extends Document {
  @Prop({ unique: true, required: true })
  priceListId: string; // Mã bảng giá

  @Prop({ type: Types.ObjectId, ref: 'Stores', required: true })
  storeId: Types.ObjectId; // Mã cửa hàng

  @Prop({ required: true })
  name: string; // Tên bảng giá

  @Prop()
  description: string; // Mô tả

  @Prop({ enum: ['retail', 'wholesale', 'agency', 'promotion'], required: true })
  type: string; // Loại bảng giá

  @Prop({ enum: ['active', 'inactive'], default: 'active' })
  status: string; // Trạng thái

  @Prop()
  validFrom: Date; // Ngày bắt đầu

  @Prop()
  validTo: Date; // Ngày kết thúc

  @Prop({ type: [{ productId: Types.ObjectId, price: Number, minQuantity: Number, maxQuantity: Number, discount: Number, discountType: String }] })
  products: { productId: Types.ObjectId; price: number; minQuantity: number; maxQuantity: number; discount: number; discountType: string }[]; // Sản phẩm

  @Prop({ type: [Types.ObjectId], ref: 'CustomerGroups' })
  customerGroups: Types.ObjectId[]; // Nhóm khách hàng

  @Prop({ type: { minOrderValue: Number, maxOrderValue: Number, paymentMethods: [String], locations: [String] } })
  conditions: {
    minOrderValue: number; // Giá trị đơn hàng tối thiểu
    maxOrderValue: number; // Giá trị đơn hàng tối đa
    paymentMethods: string[]; // Phương thức thanh toán
    locations: string[]; // Vị trí
  };
}

export const PriceListSchema = SchemaFactory.createForClass(PriceList);