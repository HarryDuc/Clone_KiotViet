import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ collection: 'SupplierGroups' })
export class SupplierGroup extends Document {
  @Prop({ unique: true, required: true })
  groupId: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ enum: ['active', 'inactive'], default: 'active' })
  status: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  // Trường mới
  @Prop({ type: [Types.ObjectId], ref: 'Suppliers' })
  suppliers: Types.ObjectId[];
}

export const SupplierGroupSchema = SchemaFactory.createForClass(SupplierGroup);