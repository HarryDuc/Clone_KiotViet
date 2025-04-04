import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ collection: 'MarketplaceListings' })
export class MarketplaceListing extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Stores', required: true })
  storeId: Types.ObjectId; // Mã cửa hàng

  @Prop({ type: Types.ObjectId, ref: 'Products', required: true })
  productId: Types.ObjectId; // Mã sản phẩm

  @Prop({ enum: ['Shopee', 'Lazada', 'Tiki', 'Sendo', 'ZaloShop', 'FacebookShop'], required: true })
  marketplace: string; // Tên sàn thương mại

  @Prop()
  listingId: string; // Mã listing trên sàn

  @Prop()
  listingUrl: string; // Đường dẫn listing

  @Prop({ required: true })
  title: string; // Tiêu đề listing

  @Prop()
  description: string; // Mô tả

  @Prop([String])
  images: string[]; // Ảnh

  @Prop({ required: true })
  price: number; // Giá

  @Prop()
  originalPrice: number; // Giá gốc

  @Prop({ required: true })
  stock: number; // Tồn kho

  @Prop()
  sku: string; // Mã SKU

  @Prop({ type: [{ name: String, value: String }] })
  attributes: { name: string; value: string }[]; // Thuộc tính

  @Prop()
  category: string; // Danh mục

  @Prop()
  subCategory: string; // Danh mục con

  @Prop({ type: { methods: [String], weight: Number, dimensions: { length: Number, width: Number, height: Number } } })
  shipping: {
    methods: string[]; // Phương thức vận chuyển
    weight: number; // Trọng lượng
    dimensions: {
      length: number; // Chiều dài
      width: number; // Chiều rộng
      height: number; // Chiều cao
    };
  };

  @Prop({ type: { totalSales: Number, totalRevenue: Number, rating: Number, reviews: Number } })
  sales: {
    totalSales: number; // Tổng bán
    totalRevenue: number; // Tổng doanh thu
    rating: number; // Đánh giá
    reviews: number; // Số đánh giá
  };

  @Prop({ enum: ['active', 'paused', 'deleted', 'error'], default: 'active' })
  status: string; // Trạng thái

  @Prop()
  lastSync: Date; // Thời gian đồng bộ cuối

  @Prop({ enum: ['success', 'failed', 'processing'], default: 'success' })
  syncStatus: string; // Trạng thái đồng bộ

  @Prop()
  syncError: string; // Lỗi đồng bộ
}

export const MarketplaceListingSchema = SchemaFactory.createForClass(MarketplaceListing);