import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class SalesChannel extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Stores', required: true })
  storeId: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({
    enum: [
      'Trực tiếp',
      'Shopee',
      'Tiki',
      'Lazada',
      'Sendo',
      'Facebook',
      'Instagram',
    ],
    required: true,
  })
  type: string;

  @Prop()
  description: string;

  @Prop({ enum: ['Đang hoạt động', 'Ngừng hoạt động'], default: 'Đang hoạt động' })
  status: string;

  @Prop({
    type: {
      syncProducts: { type: Boolean, default: false },
      syncPrices: { type: Boolean, default: false },
      syncStock: { type: Boolean, default: false },
      shopee: {
        shopId: String,
        accessToken: String,
        refreshToken: String,
        tokenExpiry: Date,
      },
      tiki: {
        sellerId: String,
        accessToken: String,
        refreshToken: String,
        tokenExpiry: Date,
      },
      lazada: {
        sellerId: String,
        accessToken: String,
        refreshToken: String,
        tokenExpiry: Date,
      },
      sendo: {
        sellerId: String,
        accessToken: String,
        refreshToken: String,
        tokenExpiry: Date,
      },
      facebook: {
        pageId: String,
        accessToken: String,
        tokenExpiry: Date,
      },
      instagram: {
        businessAccountId: String,
        accessToken: String,
        tokenExpiry: Date,
      },
    },
  })
  settings: {
    syncProducts: boolean;
    syncPrices: boolean;
    syncStock: boolean;
    shopee: {
      shopId: string;
      accessToken: string;
      refreshToken: string;
      tokenExpiry: Date;
    };
    tiki: {
      sellerId: string;
      accessToken: string;
      refreshToken: string;
      tokenExpiry: Date;
    };
    lazada: {
      sellerId: string;
      accessToken: string;
      refreshToken: string;
      tokenExpiry: Date;
    };
    sendo: {
      sellerId: string;
      accessToken: string;
      refreshToken: string;
      tokenExpiry: Date;
    };
    facebook: {
      pageId: string;
      accessToken: string;
      tokenExpiry: Date;
    };
    instagram: {
      businessAccountId: string;
      accessToken: string;
      tokenExpiry: Date;
    };
  };

  @Prop({
    type: {
      totalOrders: { type: Number, default: 0 },
      totalRevenue: { type: Number, default: 0 },
      totalProducts: { type: Number, default: 0 },
    },
  })
  statistics: {
    totalOrders: number;
    totalRevenue: number;
    totalProducts: number;
  };
}

export const SalesChannelSchema = SchemaFactory.createForClass(SalesChannel);