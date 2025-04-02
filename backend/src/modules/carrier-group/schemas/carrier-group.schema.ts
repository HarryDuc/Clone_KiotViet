import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'CarrierGroups' })
export class CarrierGroup extends Document {
  @Prop({ unique: true, required: true })
  groupId: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const CarrierGroupSchema = SchemaFactory.createForClass(CarrierGroup);