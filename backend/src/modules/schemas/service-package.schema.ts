import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ServicePackageDocument = ServicePackage & Document;

@Schema({ timestamps: true })
export class ServicePackage {
  @Prop({ required: true })
  packageId: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop([String])
  features: string[];

  @Prop({ required: true })
  price: number;

  @Prop([{
    duration: Number,
    price: Number,
    discount: Number
  }])
  durationOptions: Array<{
    duration: number;
    price: number;
    discount: number;
  }>;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const ServicePackageSchema = SchemaFactory.createForClass(ServicePackage);
