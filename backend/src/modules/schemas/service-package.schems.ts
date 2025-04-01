import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
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
}

export const ServicePackageSchema = SchemaFactory.createForClass(ServicePackage);
