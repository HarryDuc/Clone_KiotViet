import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'Brands' })
export class Brand extends Document {
  @Prop({ unique: true, required: true })
  brandId: string;

  @Prop({ required: true })
  name: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  // Trường mới
  @Prop()
  logo: string;

  @Prop()
  description: string;
}

export const BrandSchema = SchemaFactory.createForClass(Brand);