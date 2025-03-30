import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Branch } from './branch.schema';

export type CarrierGroupDocument = CarrierGroup & Document;

@Schema({ timestamps: true })
export class CarrierGroup {
  @Prop({ required: true })
  name: string;

  @Prop()
  code: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Branch', required: true })
  branch: Branch;

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Carrier' }] })
  carriers: MongooseSchema.Types.ObjectId[];

  @Prop({ type: Object })
  settings: {
    isActive: boolean;
    defaultPriority: string;
    defaultCategory: string;
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

export const CarrierGroupSchema = SchemaFactory.createForClass(CarrierGroup);