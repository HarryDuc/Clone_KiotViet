import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ collection: 'InventoryChecks' })
export class InventoryCheck extends Document {
  @Prop({ unique: true, required: true })
  checkId: string; // Mã kiểm kê

  @Prop({ type: Types.ObjectId, ref: 'Stores', required: true })
  storeId: Types.ObjectId; // Mã cửa hàng

  @Prop({ type: Types.ObjectId, ref: 'Stores', required: true })
  warehouseId: Types.ObjectId; // Mã kho

  @Prop({ required: true })
  checkDate: Date; // Ngày kiểm kê

  @Prop({ enum: ['periodic', 'spot', 'request'], required: true })
  type: string; // Loại kiểm kê

  @Prop({ enum: ['draft', 'in_progress', 'completed', 'cancelled'], default: 'draft' })
  status: string; // Trạng thái

  @Prop({ type: [{ productId: Types.ObjectId, systemQuantity: Number, actualQuantity: Number, difference: Number, unitPrice: Number, totalValue: Number, notes: String }] })
  items: { productId: Types.ObjectId; systemQuantity: number; actualQuantity: number; difference: number; unitPrice: number; totalValue: number; notes: string }[]; // Chi tiết kiểm kê

  @Prop({ default: 0 })
  totalItems: number; // Tổng số sản phẩm

  @Prop({ default: 0 })
  totalValue: number; // Tổng giá trị

  @Prop({ default: 0 })
  totalDifference: number; // Tổng chênh lệch

  @Prop({ type: Types.ObjectId, ref: 'Employees', required: true })
  checkedBy: Types.ObjectId; // Mã nhân viên kiểm kê

  @Prop({ type: Types.ObjectId, ref: 'Employees' })
  verifiedBy: Types.ObjectId; // Mã nhân viên xác nhận

  @Prop([String])
  attachments: string[]; // Tệp đính kèm

  @Prop()
  notes: string; // Ghi chú
}

export const InventoryCheckSchema = SchemaFactory.createForClass(InventoryCheck);