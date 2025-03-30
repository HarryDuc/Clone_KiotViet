import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class ServicePackage extends Document {
  @Prop({ unique: true })
  packageId: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop([String])
  features: string[];

  @Prop({ required: true })
  price: number;

  @Prop([Number])
  durationOptions: number[];

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const ServicePackageSchema = SchemaFactory.createForClass(ServicePackage);