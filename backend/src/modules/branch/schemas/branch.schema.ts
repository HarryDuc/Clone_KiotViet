import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ collection: 'Branches' })
export class Branch extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  location: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;

  // Trường mới
  @Prop({ type: Types.ObjectId, ref: 'Employees' })
  managerId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Warehouses' })
  warehouseId: Types.ObjectId;
}

export const BranchSchema = SchemaFactory.createForClass(Branch);