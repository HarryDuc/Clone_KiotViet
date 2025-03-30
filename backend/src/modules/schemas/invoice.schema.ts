import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type InvoiceDocument = Invoice & Document;

@Schema()
class InvoiceItem {
  @Prop({ type: Types.ObjectId, ref: 'Product', required: true })
  productId: Types.ObjectId;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  unitPrice: number;

  @Prop({ default: 0 })
  discount: number;

  @Prop({ required: true })
  total: number;
}

@Schema()
export class Invoice {
  @Prop({ unique: true })
  invoiceId: string;

  @Prop({ type: Types.ObjectId, ref: 'Store', required: true })
  storeId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Order', required: true })
  orderId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Customer', required: true })
  customerId: Types.ObjectId;

  @Prop({ required: true })
  invoiceNumber: string;

  @Prop({ required: true })
  invoiceDate: Date;

  @Prop()
  dueDate: Date;

  @Prop({ type: [InvoiceItem] })
  items: InvoiceItem[];

  @Prop({ required: true })
  subtotal: number;

  @Prop({ default: 0 })
  tax: number;

  @Prop({ default: 0 })
  shipping: number;

  @Prop({ required: true })
  total: number;

  @Prop({
    enum: ['Tiền mặt', 'Chuyển khoản', 'Thẻ tín dụng', 'Ví điện tử'],
    required: true
  })
  paymentMethod: string;

  @Prop({
    enum: ['Chưa thanh toán', 'Đã thanh toán một phần', 'Đã thanh toán', 'Đã hủy'],
    default: 'Chưa thanh toán'
  })
  paymentStatus: string;

  @Prop()
  notes: string;

  @Prop({
    enum: ['Draft', 'Issued', 'Cancelled', 'Void'],
    default: 'Draft'
  })
  status: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const InvoiceSchema = SchemaFactory.createForClass(Invoice);