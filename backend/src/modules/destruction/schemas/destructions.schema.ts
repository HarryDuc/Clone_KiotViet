import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ collection: 'Destructions' })
export class Destruction extends Document {
  @Prop({ unique: true, required: true })
  destructionId: string; // Mã hủy hàng

  @Prop()
  destructionCode: string; // Mã hủy hàng hiển thị

  @Prop({ type: [{ productId: Types.ObjectId, quantity: Number }] })
  products: { productId: Types.ObjectId; quantity: number }[]; // Danh sách sản phẩm hủy

  @Prop()
  totalValue: number; // Tổng giá trị

  @Prop({ enum: ['draft', 'completed', 'cancelled'], default: 'draft' })
  status: string; // Trạng thái
}

export const DestructionSchema = SchemaFactory.createForClass(Destruction);