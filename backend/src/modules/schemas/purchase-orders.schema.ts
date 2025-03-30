import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class PurchaseOrderProduct {
  @Prop({ type: Types.ObjectId, ref: 'Products' })
  productId: Types.ObjectId;

  @Prop()
  quantity: number;

  @Prop()
  price: number;
}

export const PurchaseOrderProductSchema = SchemaFactory.createForClass(PurchaseOrderProduct);

@Schema({ timestamps: true })
export class PurchaseOrder extends Document {
  @Prop({ unique: true })
  purchaseOrderId: string;

  @Prop()
  purchaseOrderCode: string;

  @Prop({ type: Types.ObjectId, ref: 'Suppliers' })
  supplierId: Types.ObjectId;

  @Prop({ type: [PurchaseOrderProductSchema] })
  products: PurchaseOrderProduct[];

  @Prop()
  totalAmount: number;

  @Prop({ enum: ['Phiếu tạm thời', 'Đã nhập hàng', 'Đã hủy'], default: 'Phiếu tạm thời' })
  status: string;
}

export const PurchaseOrderSchema = SchemaFactory.createForClass(PurchaseOrder);