import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Branch } from './branch.schema';

export type CustomerGroupDocument = CustomerGroup & Document;

@Schema({ timestamps: true })
export class CustomerGroup {
  @Prop({ required: true })
  name: string;

  @Prop()
  code: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Branch', required: true })
  branch: Branch;

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Customer' }] })
  customers: MongooseSchema.Types.ObjectId[];

  @Prop({ type: Object })
  settings: {
    isActive: boolean;
    defaultDiscount: number;
    defaultTaxRate: number;
    defaultPaymentTerms: number;
  };

  @Prop({ type: Object })
  metadata: {
    category: string;
    priority: string;
    tags: string[];
    notes: string[];
  };

  @Prop()
  note: string;
}

export const CustomerGroupSchema = SchemaFactory.createForClass(CustomerGroup);