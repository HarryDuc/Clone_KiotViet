import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class CustomerGroup extends Document {
  @Prop({ unique: true })
  groupId: string;

  @Prop({ required: true })
  name: string;

  @Prop({ enum: ['VND', '%'] })
  discountType: string;

  @Prop()
  discountValue: number;

  @Prop()
  description: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const CustomerGroupSchema = SchemaFactory.createForClass(CustomerGroup);