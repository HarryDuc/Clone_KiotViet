import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BranchDocument = Branch & Document;

@Schema()
export class Branch {
  @Prop({ required: true, unique: true })
  branchId: string;

  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true })
  location: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const BranchSchema = SchemaFactory.createForClass(Branch);
