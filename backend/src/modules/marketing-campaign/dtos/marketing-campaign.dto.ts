// MarketingCampaignDTO: Đại diện toàn bộ schema
export class MarketingCampaignDTO {
  storeId: string; // Mã cửa hàng
  name: string; // Tên chiến dịch
  type: string; // Loại chiến dịch
  description: string; // Mô tả
  startDate: Date; // Ngày bắt đầu
  endDate: Date; // Ngày kết thúc
  status: string; // Trạng thái
  conditions: {
    minOrderValue: number;
    maxDiscount: number;
    applicableProducts: string[];
    applicableCategories: string[];
    applicableCustomerGroups: string[];
    usageLimit: number;
    usagePerCustomer: number;
  }; // Điều kiện
  rewards: {
    discountType: string;
    discountValue: number;
    freeShipping: boolean;
    giftProduct: string;
    bundleProducts: { product: string; quantity: number }[];
    loyaltyPoints: number;
  }; // Phần thưởng
  statistics: {
    totalUsage: number;
    totalRevenue: number;
    totalCustomers: number;
  }; // Thống kê
}

// CreateMarketingCampaignDTO: Dùng để tạo mới
export class CreateMarketingCampaignDTO {
  storeId: string; // Mã cửa hàng
  name: string; // Tên chiến dịch
  type: string; // Loại chiến dịch
  description: string; // Mô tả
  startDate: Date; // Ngày bắt đầu
  endDate: Date; // Ngày kết thúc
  status: string; // Trạng thái
  conditions: {
    minOrderValue: number;
    maxDiscount: number;
    applicableProducts: string[];
    applicableCategories: string[];
    applicableCustomerGroups: string[];
    usageLimit: number;
    usagePerCustomer: number;
  }; // Điều kiện
  rewards: {
    discountType: string;
    discountValue: number;
    freeShipping: boolean;
    giftProduct: string;
    bundleProducts: { product: string; quantity: number }[];
    loyaltyPoints: number;
  }; // Phần thưởng
}

// UpdateMarketingCampaignDTO: Dùng để cập nhật
export class UpdateMarketingCampaignDTO {
  name?: string; // Tên chiến dịch
  type?: string; // Loại chiến dịch
  description?: string; // Mô tả
  startDate?: Date; // Ngày bắt đầu
  endDate?: Date; // Ngày kết thúc
  status?: string; // Trạng thái
  conditions?: {
    minOrderValue?: number;
    maxDiscount?: number;
    applicableProducts?: string[];
    applicableCategories?: string[];
    applicableCustomerGroups?: string[];
    usageLimit?: number;
    usagePerCustomer?: number;
  }; // Điều kiện
  rewards?: {
    discountType?: string;
    discountValue?: number;
    freeShipping?: boolean;
    giftProduct?: string;
    bundleProducts?: { product: string; quantity: number }[];
    loyaltyPoints?: number;
  }; // Phần thưởng
  statistics?: {
    totalUsage?: number;
    totalRevenue?: number;
    totalCustomers?: number;
  }; // Thống kê
}