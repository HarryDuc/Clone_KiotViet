import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'Brands', timestamps: true })
export class Brand extends Document {
  @Prop({ unique: true, required: true })
  brandId: string;

  @Prop({ required: true })
  name: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const BrandSchema = SchemaFactory.createForClass(Brand);