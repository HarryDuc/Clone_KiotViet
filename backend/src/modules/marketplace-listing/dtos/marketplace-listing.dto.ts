// MarketplaceListingDTO: Đại diện toàn bộ schema
export class MarketplaceListingDTO {
  storeId: string; // Mã cửa hàng
  productId: string; // Mã sản phẩm
  marketplace: string; // Tên sàn
  listingId: string; // Mã listing
  listingUrl: string; // Đường dẫn
  title: string; // Tiêu đề
  description: string; // Mô tả
  images: string[]; // Ảnh
  price: number; // Giá
  originalPrice: number; // Giá gốc
  stock: number; // Tồn kho
  sku: string; // SKU
  attributes: { name: string; value: string }[]; // Thuộc tính
  category: string; // Danh mục
  subCategory: string; // Danh mục con
  shipping: {
    methods: string[];
    weight: number;
    dimensions: {
      length: number;
      width: number;
      height: number;
    };
  }; // Vận chuyển
  sales: {
    totalSales: number;
    totalRevenue: number;
    rating: number;
    reviews: number;
  }; // Doanh số
  status: string; // Trạng thái
  lastSync: Date; // Đồng bộ cuối
  syncStatus: string; // Trạng thái đồng bộ
  syncError: string; // Lỗi đồng bộ
}

// CreateMarketplaceListingDTO: Dùng để tạo mới
export class CreateMarketplaceListingDTO {
  storeId: string; // Mã cửa hàng
  productId: string; // Mã sản phẩm
  marketplace: string; // Tên sàn
  title: string; // Tiêu đề
  description: string; // Mô tả
  images: string[]; // Ảnh
  price: number; // Giá
  originalPrice: number; // Giá gốc
  stock: number; // Tồn kho
  sku: string; // SKU
  attributes: { name: string; value: string }[]; // Thuộc tính
  category: string; // Danh mục
  subCategory: string; // Danh mục con
  shipping: {
    methods: string[];
    weight: number;
    dimensions: {
      length: number;
      width: number;
      height: number;
    };
  }; // Vận chuyển
  status: string; // Trạng thái
}

// UpdateMarketplaceListingDTO: Dùng để cập nhật
export class UpdateMarketplaceListingDTO {
  title?: string; // Tiêu đề
  description?: string; // Mô tả
  images?: string[]; // Ảnh
  price?: number; // Giá
  originalPrice?: number; // Giá gốc
  stock?: number; // Tồn kho
  sku?: string; // SKU
  attributes?: { name: string; value: string }[]; // Thuộc tính
  category?: string; // Danh mục
  subCategory?: string; // Danh mục con
  shipping?: {
    methods?: string[];
    weight?: number;
    dimensions?: {
      length?: number;
      width?: number;
      height?: number;
    };
  }; // Vận chuyển
  status?: string; // Trạng thái
  syncStatus?: string; // Trạng thái đồng bộ
  syncError?: string; // Lỗi đồng bộ
}