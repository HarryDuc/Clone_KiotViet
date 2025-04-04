import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ collection: 'Invoices' })
export class Invoice extends Document {
  @Prop({ unique: true, required: true })
  invoiceId: string; // Mã hóa đơn

  @Prop({ type: Types.ObjectId, ref: 'Stores', required: true })
  storeId: Types.ObjectId; // Mã cửa hàng

  @Prop({ type: Types.ObjectId, ref: 'Orders', required: true })
  orderId: Types.ObjectId; // Mã đơn hàng

  @Prop({ type: Types.ObjectId, ref: 'Customers', required: true })
  customerId: Types.ObjectId; // Mã khách hàng

  @Prop({ required: true })
  invoiceNumber: string; // Số hóa đơn

  @Prop({ required: true, default: Date.now })
  invoiceDate: Date; // Ngày hóa đơn

  @Prop()
  dueDate: Date; // Ngày đến hạn

  @Prop({ type: [{ productId: Types.ObjectId, quantity: Number, unitPrice: Number, discount: Number, total: Number }] })
  items: { productId: Types.ObjectId; quantity: number; unitPrice: number; discount: number; total: number }[]; // Chi tiết hóa đơn

  @Prop({ required: true })
  subtotal: number; // Tạm tính

  @Prop({ default: 0 })
  tax: number; // Thuế

  @Prop({ default: 0 })
  shipping: number; // Phí vận chuyển

  @Prop({ required: true })
  total: number; // Tổng cộng

  @Prop({ enum: ['cash', 'bank_transfer', 'credit_card', 'wallet'], required: true })
  paymentMethod: string; // Phương thức thanh toán

  @Prop({ enum: ['unpaid', 'partial', 'paid', 'cancelled'], default: 'unpaid' })
  paymentStatus: string; // Trạng thái thanh toán

  @Prop()
  notes: string; // Ghi chú

  @Prop({ enum: ['draft', 'issued', 'cancelled', 'void'], default: 'draft' })
  status: string; // Trạng thái hóa đơn
}

export const InvoiceSchema = SchemaFactory.createForClass(Invoice);