import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'CarrierGroups' })
export class CarrierGroup extends Document {
  @Prop({ unique: true, required: true })
  groupId: string; // Mã nhóm đơn vị vận chuyển

  @Prop({ required: true })
  name: string; // Tên nhóm

  @Prop()
  description: string; // Mô tả

  @Prop({ default: Date.now })
  createdAt: Date; // Thời gian tạo
}

export const CarrierGroupSchema = SchemaFactory.createForClass(CarrierGroup);