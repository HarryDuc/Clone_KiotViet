import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ collection: 'ReturnProducts' })
export class ReturnProduct {
  @Prop({ type: Types.ObjectId, ref: 'Products' })
  productId: Types.ObjectId;

  @Prop()
  quantity: number;
}

export const ReturnProductSchema = SchemaFactory.createForClass(ReturnProduct);

@Schema({ timestamps: true, collection: 'Returns' })
export class Return extends Document {
  @Prop({ unique: true, required: true })
  returnId: string;

  @Prop()
  returnCode: string;

  @Prop({ type: Types.ObjectId, ref: 'Orders' })
  orderId: Types.ObjectId;

  @Prop({ type: [ReturnProductSchema] })
  products: ReturnProduct[];

  @Prop()
  reason: string;

  @Prop()
  totalRefund: number;

  @Prop({ enum: ['Đã trả', 'Đã hủy'], default: 'Đã trả' })
  status: string;
}

export const ReturnSchema = SchemaFactory.createForClass(Return);