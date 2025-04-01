import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class InvoiceItem {
  @Prop({ type: Types.ObjectId, ref: 'Products', required: true })
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

export const InvoiceItemSchema = SchemaFactory.createForClass(InvoiceItem);

@Schema({ timestamps: true })
export class Invoice extends Document {
  @Prop({ unique: true })
  invoiceId: string;

  @Prop({ type: Types.ObjectId, ref: 'Stores', required: true })
  storeId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Orders', required: true })
  orderId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Customers', required: true })
  customerId: Types.ObjectId;

  @Prop({ required: true })
  invoiceNumber: string;

  @Prop({ required: true, default: Date.now })
  invoiceDate: Date;

  @Prop()
  dueDate: Date;

  @Prop({ type: [InvoiceItemSchema] })
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
    required: true,
  })
  paymentMethod: string;

  @Prop({
    enum: [
      'Chưa thanh toán',
      'Đã thanh toán một phần',
      'Đã thanh toán',
      'Đã hủy',
    ],
    default: 'Chưa thanh toán',
  })
  paymentStatus: string;

  @Prop()
  notes: string;

  @Prop({ enum: ['Draft', 'Issued', 'Cancelled', 'Void'], default: 'Draft' })
  status: string;
}

export const InvoiceSchema = SchemaFactory.createForClass(Invoice);

InvoiceSchema.index({ storeId: 1 });
InvoiceSchema.index({ orderId: 1 });
InvoiceSchema.index({ customerId: 1 });
InvoiceSchema.index({ invoiceNumber: 1 });