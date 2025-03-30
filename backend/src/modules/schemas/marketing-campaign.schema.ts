import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Branch } from './branch.schema';
import { User } from './user.schema';
import { Product } from './product.schema';
import { Customer } from './customer.schema';

export type MarketingCampaignDocument = MarketingCampaign & Document;

@Schema({ timestamps: true })
export class MarketingCampaign {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Branch', required: true })
  branch: Branch;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  createdBy: User;

  @Prop({ required: true })
  startDate: Date;

  @Prop()
  endDate: Date;

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Product' }] })
  products: Product[];

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Customer' }] })
  targetCustomers: Customer[];

  @Prop({ type: Object })
  campaignSettings: {
    type: string;
    channel: string;
    budget: number;
    frequency: string;
    schedule: {
      type: string;
      times: string[];
      days: string[];
    };
  };

  @Prop({ type: Object })
  content: {
    subject: string;
    body: string;
    images: string[];
    links: string[];
    callToAction: {
      text: string;
      url: string;
    };
  };

  @Prop({ type: Object })
  analytics: {
    sent: number;
    delivered: number;
    opened: number;
    clicked: number;
    converted: number;
    revenue: number;
  };

  @Prop({ default: 'draft', enum: ['draft', 'scheduled', 'active', 'paused', 'completed', 'cancelled'] })
  status: string;

  @Prop({ type: Object })
  metadata: {
    tags: string[];
    category: string;
    priority: string;
    notes: string[];
  };

  @Prop()
  note: string;
}

export const MarketingCampaignSchema = SchemaFactory.createForClass(MarketingCampaign);