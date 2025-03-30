import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class SupplierGroup extends Document {
  @Prop({ unique: true })
  groupId: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const SupplierGroupSchema = SchemaFactory.createForClass(SupplierGroup);