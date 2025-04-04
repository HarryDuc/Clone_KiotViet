import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'Positions' })
export class Position extends Document {
  @Prop({ unique: true, required: true })
  positionId: string; // Mã vị trí

  @Prop({ required: true })
  name: string; // Tên vị trí

  @Prop()
  description: string; // Mô tả

  @Prop({ enum: ['active', 'inactive'], default: 'active' })
  status: string; // Trạng thái

  @Prop({ default: Date.now })
  createdAt: Date; // Thời gian tạo
}

export const PositionSchema = SchemaFactory.createForClass(Position);