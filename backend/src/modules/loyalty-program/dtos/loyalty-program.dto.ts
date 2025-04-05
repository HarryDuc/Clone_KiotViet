export class TierDTO {
  name: string;
  minPoints: number;
  maxPoints?: number;
  benefits: { type: string; value: number; description: string }[];
}

export class RewardDTO {
  rewardId: string;
  name: string;
  points: number;
  description: string;
  image: string;
  stock: number;
  status: string;
  expiryDate?: Date;
}

export class LoyaltyProgramDTO {
  storeId: string;
  name: string;
  description: string;
  status: string;
  pointRules: {
    earnRate: number;
    minPoints: number;
    pointValue: number;
    expiryDays: number;
  };
  tiers: TierDTO[];
  rewards: RewardDTO[];
  statistics: {
    totalMembers: number;
    totalPointsIssued: number;
    totalPointsRedeemed: number;
    totalRewardsRedeemed: number;
    totalRevenueFromLoyalty: number;
  };
  members?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export class CreateLoyaltyProgramDTO {
  storeId: string;
  name: string;
  description?: string;
  status?: string;
  pointRules: {
    earnRate: number;
    minPoints: number;
    pointValue: number;
    expiryDays: number;
  };
  tiers: TierDTO[];
  rewards: RewardDTO[];
}

export class UpdateLoyaltyProgramDTO {
  name?: string;
  description?: string;
  status?: string;
  pointRules?: {
    earnRate?: number;
    minPoints?: number;
    pointValue?: number;
    expiryDays?: number;
  };
  tiers?: TierDTO[];
  rewards?: RewardDTO[];
  statistics?: {
    totalMembers?: number;
    totalPointsIssued?: number;
    totalPointsRedeemed?: number;
    totalRewardsRedeemed?: number;
    totalRevenueFromLoyalty?: number;
  };
  members?: string[];
}
