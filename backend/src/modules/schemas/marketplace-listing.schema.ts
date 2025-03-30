import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({ timestamps: true })
export class MarketplaceListing extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Store', required: true })
  storeId: MongooseSchema.Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Product', required: true })
  productId: MongooseSchema.Types.ObjectId;

  @Prop({
    type: String,
    enum: ['Shopee', 'Lazada', 'Tiki', 'Sendo', 'ZaloShop', 'FacebookShop'],
    required: true
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

  @Prop([{
    name: String,
    value: String
  }])
  attributes: Array<{ name: string; value: string }>;

  @Prop()
  category: string;

  @Prop()
  subCategory: string;

  @Prop({
    methods: [String],
    weight: Number,
    dimensions: {
      length: Number,
      width: Number,
      height: Number
    }
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
    totalSales: { type: Number, default: 0 },
    totalRevenue: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    reviews: { type: Number, default: 0 }
  })
  sales: {
    totalSales: number;
    totalRevenue: number;
    rating: number;
    reviews: number;
  };

  @Prop({
    type: String,
    enum: ['Đang hoạt động', 'Tạm ngưng', 'Đã xóa', 'Lỗi'],
    default: 'Đang hoạt động'
  })
  status: string;

  @Prop()
  lastSync: Date;

  @Prop({
    type: String,
    enum: ['Thành công', 'Thất bại', 'Đang xử lý'],
    default: 'Thành công'
  })
  syncStatus: string;

  @Prop()
  syncError: string;
}

export const MarketplaceListingSchema = SchemaFactory.createForClass(MarketplaceListing);

// Add indexes
MarketplaceListingSchema.index({ storeId: 1 });
MarketplaceListingSchema.index({ productId: 1 });
MarketplaceListingSchema.index({ marketplace: 1 });
MarketplaceListingSchema.index({ listingId: 1 });
MarketplaceListingSchema.index({ status: 1 });