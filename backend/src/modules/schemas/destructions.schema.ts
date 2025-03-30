import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class DestructionProduct {
  @Prop({ type: Types.ObjectId, ref: 'Products' })
  productId: Types.ObjectId;

  @Prop()
  quantity: number;
}

export const DestructionProductSchema = SchemaFactory.createForClass(DestructionProduct);

@Schema({ timestamps: true })
export class Destruction extends Document {
  @Prop({ unique: true })
  destructionId: string;

  @Prop()
  destructionCode: string;

  @Prop({ type: [DestructionProductSchema] })
  products: DestructionProduct[];

  @Prop()
  totalValue: number;

  @Prop({ enum: ['Phiếu tạm thời', 'Hoàn thành', 'Đã hủy'], default: 'Phiếu tạm thời' })
  status: string;
}

export const DestructionSchema = SchemaFactory.createForClass(Destruction);