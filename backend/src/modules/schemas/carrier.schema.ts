import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Branch } from './branch.schema';
import { CarrierGroup } from './carrier-group.schema';

export type CarrierDocument = Carrier & Document;

@Schema({ timestamps: true })
export class Carrier {
  @Prop({ required: true })
  name: string;

  @Prop()
  code: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Branch', required: true })
  branch: Branch;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'CarrierGroup' })
  group: CarrierGroup;

  @Prop({ type: Object })
  contact: {
    name: string;
    phone: string;
    email: string;
    address: string;
  };

  @Prop({ type: Object })
  settings: {
    isActive: boolean;
    trackingEnabled: boolean;
    apiEnabled: boolean;
    apiCredentials?: {
      key: string;
      secret: string;
      endpoint: string;
    };
  };

  @Prop({ type: Object })
  shipping: {
    methods: string[];
    zones: string[];
    weightLimits: {
      min: number;
      max: number;
    };
    dimensions: {
      maxLength: number;
      maxWidth: number;
      maxHeight: number;
    };
  };

  @Prop({ type: Object })
  pricing: {
    baseRate: number;
    weightRate: number;
    volumeRate: number;
    currency: string;
    taxRate: number;
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

export const CarrierSchema = SchemaFactory.createForClass(Carrier);