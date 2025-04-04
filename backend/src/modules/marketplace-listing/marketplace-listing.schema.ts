import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Attribute {
  @Prop()
  name: string;

  @Prop()
  value: string;
}

export const AttributeSchema = SchemaFactory.createForClass(Attribute);

@Schema({ timestamps: true })
export class MarketplaceListing extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Stores', required: true })
  storeId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Products', required: true })
  productId: Types.ObjectId;

  @Prop({
    enum: ['Shopee', 'Lazada', 'Tiki', 'Sendo', 'ZaloShop', 'FacebookShop'],
    required: true,
  })
  marketplace: string;

  @Prop()
  listingId: string;

  @Prop()
  listingUrl: string;

  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop([String])
  images: string[];

  @Prop({ required: true })
  price: number;

  @Prop()
  originalPrice: number;

  @Prop({ required: true })
  stock: number;

  @Prop()
  sku: string;

  @Prop({ type: [AttributeSchema] })
  attributes: Attribute[];

  @Prop()
  category: string;

  @Prop()
  subCategory: string;

  @Prop({
    type: {
      methods: [String],
      weight: Number,
      dimensions: {
        length: Number,
        width: Number,
        height: Number,
      },
    },
  })
  shipping: {
    methods: string[];
    weight: number;
    dimensions: {
      length: number;
      width: number;
      height: number;
    };
  };

  @Prop({
    type: {
      totalSales: { type: Number, default: 0 },
      totalRevenue: { type: Number, default: 0 },
      rating: { type: Number, default: 0 },
      reviews: { type: Number, default: 0 },
    },
  })
  sales: {
    totalSales: number;
    totalRevenue: number;
    rating: number;
    reviews: number;
  };

  @Prop({ enum: ['Đang hoạt động', 'Tạm ngưng', 'Đã xóa', 'Lỗi'], default: 'Đang hoạt động' })
  status: string;

  @Prop()
  lastSync: Date;

  @Prop({ enum: ['Thành công', 'Thất bại', 'Đang xử lý'], default: 'Thành công' })
  syncStatus: string;

  @Prop()
  syncError: string;
}

export const MarketplaceListingSchema = SchemaFactory.createForClass(MarketplaceListing);

MarketplaceListingSchema.index({ storeId: 1 });
MarketplaceListingSchema.index({ productId: 1 });
MarketplaceListingSchema.index({ marketplace: 1 });
MarketplaceListingSchema.index({ listingId: 1 });
MarketplaceListingSchema.index({ status: 1 });