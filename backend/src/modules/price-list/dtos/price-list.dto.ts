// PriceListDTO: Đại diện toàn bộ schema
export class PriceListDTO {
  priceListId: string; // Mã bảng giá
  storeId: string; // Mã cửa hàng
  name: string; // Tên
  description: string; // Mô tả
  type: string; // Loại
  status: string; // Trạng thái
  validFrom: Date; // Ngày bắt đầu
  validTo: Date; // Ngày kết thúc
  products: { productId: string; price: number; minQuantity: number; maxQuantity: number; discount: number; discountType: string }[]; // Sản phẩm
  customerGroups: string[]; // Nhóm khách hàng
  conditions: {
    minOrderValue: number;
    maxOrderValue: number;
    paymentMethods: string[];
    locations: string[];
  }; // Điều kiện
}

// CreatePriceListDTO: Dùng để tạo mới
export class CreatePriceListDTO {
  storeId: string; // Mã cửa hàng
  name: string; // Tên
  description: string; // Mô tả
  type: string; // Loại
  status: string; // Trạng thái
  validFrom: Date; // Ngày bắt đầu
  validTo: Date; // Ngày kết thúc
  products: { productId: string; price: number; minQuantity: number; maxQuantity: number; discount: number; discountType: string }[]; // Sản phẩm
  customerGroups: string[]; // Nhóm khách hàng
  conditions: {
    minOrderValue: number;
    maxOrderValue: number;
    paymentMethods: string[];
    locations: string[];
  }; // Điều kiện
}

// UpdatePriceListDTO: Dùng để cập nhật
export class UpdatePriceListDTO {
  name?: string; // Tên
  description?: string; // Mô tả
  type?: string; // Loại
  status?: string; // Trạng thái
  validFrom?: Date; // Ngày bắt đầu
  validTo?: Date; // Ngày kết thúc
  products?: { productId: string; price: number; minQuantity: number; maxQuantity: number; discount: number; discountType: string }[]; // Sản phẩm
  customerGroups?: string[]; // Nhóm khách hàng
  conditions?: {
    minOrderValue?: number;
    maxOrderValue?: number;
    paymentMethods?: string[];
    locations?: string[];
  }; // Điều kiện
}