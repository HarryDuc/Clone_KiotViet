import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Branch } from './branch.schema';
import { User } from './user.schema';

export type InventoryCheckDocument = InventoryCheck & Document;

@Schema({ timestamps: true })
export class InventoryCheck {
  @Prop({ required: true })
  code: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Branch', required: true })
  branch: Branch;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  createdBy: User;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  approvedBy: User;

  @Prop({ required: true })
  checkDate: Date;

  @Prop({
    type: [{
      productId: { type: MongooseSchema.Types.ObjectId, ref: 'Product' },
      expectedQuantity: Number,
      actualQuantity: Number,
      difference: Number,
      note: String
    }]
  })
  items: Array<{
    productId: MongooseSchema.Types.ObjectId;
    expectedQuantity: number;
    actualQuantity: number;
    difference: number;
    note: string;
  }>;

  @Prop({ default: 'pending', enum: ['pending', 'approved', 'rejected'] })
  status: string;

  @Prop()
  note: string;
}

export const InventoryCheckSchema = SchemaFactory.createForClass(InventoryCheck);