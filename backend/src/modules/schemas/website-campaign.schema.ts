import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Branch } from './branch.schema';
import { User } from './user.schema';

export type WebsiteCampaignDocument = WebsiteCampaign & Document;

@Schema({ timestamps: true })
export class WebsiteCampaign {
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

  @Prop({ type: Object })
  settings: {
    isActive: boolean;
    isRecurring: boolean;
    recurrencePattern?: {
      frequency: string;
      interval: number;
      daysOfWeek?: number[];
      daysOfMonth?: number[];
    };
    targetAudience: string[];
    displayRules: {
      showOnHomepage: boolean;
      showOnProductPages: boolean;
      showOnCart: boolean;
      showOnCheckout: boolean;
    };
  };

  @Prop({ type: Object })
  content: {
    title: string;
    subtitle: string;
    description: string;
    imageUrl: string;
    buttonText: string;
    buttonLink: string;
    backgroundColor: string;
    textColor: string;
  };

  @Prop({ type: Object })
  targeting: {
    customerGroups: MongooseSchema.Types.ObjectId[];
    customerSegments: string[];
    locations: string[];
    devices: string[];
    browsers: string[];
  };

  @Prop({ type: Object })
  analytics: {
    views: number;
    clicks: number;
    conversions: number;
    revenue: number;
    averageOrderValue: number;
  };

  @Prop({ default: 'draft', enum: ['draft', 'active', 'paused', 'ended', 'cancelled'] })
  status: string;

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

export const WebsiteCampaignSchema = SchemaFactory.createForClass(WebsiteCampaign);