import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class CashBook extends Document {
  @Prop({ unique: true })
  cashBookId: string;

  @Prop({ type: Types.ObjectId, ref: 'Stores', required: true })
  storeId: Types.ObjectId;

  @Prop({ enum: ['Thu', 'Chi'], required: true })
  type: string;

  @Prop({
    enum: [
      'Thu từ bán hàng',
      'Thu từ khác',
      'Chi mua hàng',
      'Chi lương',
      'Chi vận chuyển',
      'Chi marketing',
      'Chi khác',
    ],
    required: true,
  })
  category: string;

  @Prop({ required: true })
  amount: number;

  @Prop({
    enum: ['Tiền mặt', 'Chuyển khoản', 'Thẻ tín dụng', 'Ví điện tử'],
    required: true,
  })
  paymentMethod: string;

  @Prop({
    enum: ['Đơn hàng', 'Hóa đơn', 'Phiếu nhập', 'Phiếu xuất', 'Khác'],
    required: true,
  })
  reference: string;

  @Prop({ type: Types.ObjectId })
  referenceId: Types.ObjectId;

  @Prop()
  description: string;

  @Prop({ required: true, default: Date.now })
  date: Date;

  @Prop({ type: Types.ObjectId, ref: 'Employees', required: true })
  employeeId: Types.ObjectId;

  @Prop([String])
  attachments: string[];

  @Prop({ enum: ['Đã xác nhận', 'Chờ xác nhận', 'Đã hủy'], default: 'Chờ xác nhận' })
  status: string;

  @Prop()
  notes: string;
}

export const CashBookSchema = SchemaFactory.createForClass(CashBook);

CashBookSchema.index({ storeId: 1 });
CashBookSchema.index({ type: 1 });
CashBookSchema.index({ category: 1 });
CashBookSchema.index({ date: 1 });
CashBookSchema.index({ referenceId: 1 });