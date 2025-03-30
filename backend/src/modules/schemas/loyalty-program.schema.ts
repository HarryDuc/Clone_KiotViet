import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Branch } from './branch.schema';
import { User } from './user.schema';
import { CustomerGroup } from './customer-group.schema';

export type LoyaltyProgramDocument = LoyaltyProgram & Document;

@Schema({ timestamps: true })
export class LoyaltyProgram {
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

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'CustomerGroup' }] })
  applicableGroups: CustomerGroup[];

  @Prop({ type: Object })
  pointsRules: {
    earnRate: number;
    spendRate: number;
    minimumPoints: number;
    maximumPoints: number;
    pointsExpiry: number; // in days
    excludedProducts: MongooseSchema.Types.ObjectId[];
    excludedCategories: MongooseSchema.Types.ObjectId[];
  };

  @Prop({ type: Object })
  tierRules: {
    tiers: Array<{
      name: string;
      pointsRequired: number;
      benefits: string[];
      discountRate: number;
    }>;
    upgradeRules: {
      autoUpgrade: boolean;
      reviewPeriod: number; // in days
    };
  };

  @Prop({ type: Object })
  rewards: {
    types: string[];
    minimumPoints: number;
    maximumPoints: number;
    validityPeriod: number; // in days
    excludedProducts: MongooseSchema.Types.ObjectId[];
    excludedCategories: MongooseSchema.Types.ObjectId[];
  };

  @Prop({ type: Object })
  analytics: {
    totalMembers: number;
    activeMembers: number;
    totalPointsIssued: number;
    totalPointsRedeemed: number;
    totalRewardsIssued: number;
    averagePointsPerMember: number;
  };

  @Prop({ default: 'active', enum: ['active', 'inactive', 'expired', 'cancelled'] })
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

export const LoyaltyProgramSchema = SchemaFactory.createForClass(LoyaltyProgram);