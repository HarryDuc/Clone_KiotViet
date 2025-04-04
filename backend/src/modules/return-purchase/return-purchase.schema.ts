import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class ReturnPurchaseProduct {
  @Prop({ type: Types.ObjectId, ref: 'Products' })
  productId: Types.ObjectId;

  @Prop()
  quantity: number;
}

export const ReturnPurchaseProductSchema = SchemaFactory.createForClass(ReturnPurchaseProduct);

@Schema({ timestamps: true })
export class ReturnPurchase extends Document {
  @Prop({ unique: true })
  returnPurchaseId: string;

  @Prop()
  returnPurchaseCode: string;

  @Prop({ type: Types.ObjectId, ref: 'PurchaseOrders' })
  purchaseOrderId: Types.ObjectId;

  @Prop({ type: [ReturnPurchaseProductSchema] })
  products: ReturnPurchaseProduct[];

  @Prop()
  reason: string;

  @Prop()
  totalRefund: number;

  @Prop({ enum: ['Phiếu tạm thời', 'Đã trả hàng', 'Đã hủy'], default: 'Phiếu tạm thời' })
  status: string;
}

export const ReturnPurchaseSchema = SchemaFactory.createForClass(ReturnPurchase);