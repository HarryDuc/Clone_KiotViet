// CustomerLoyaltyPointsDTO: Đại diện toàn bộ schema
export class CustomerLoyaltyPointsDTO {
  storeId: string; // Mã cửa hàng
  customerId: string; // Mã khách hàng
  programId: string; // Mã chương trình
  currentPoints: number; // Điểm hiện tại
  totalPointsEarned: number; // Tổng điểm kiếm được
  totalPointsRedeemed: number; // Tổng điểm đã đổi
  tier: string; // Cấp bậc
  pointsHistory: { type: string; points: number; orderId: string; rewardId: string; description: string; expiryDate: Date; createdAt: Date }[]; // Lịch sử điểm
}

// CreateCustomerLoyaltyPointsDTO: Dùng để tạo mới
export class CreateCustomerLoyaltyPointsDTO {
  storeId: string; // Mã cửa hàng
  customerId: string; // Mã khách hàng
  programId: string; // Mã chương trình
  currentPoints: number; // Điểm hiện tại
  totalPointsEarned: number; // Tổng điểm kiếm được
  totalPointsRedeemed: number; // Tổng điểm đã đổi
  tier: string; // Cấp bậc
  pointsHistory: { type: string; points: number; orderId: string; rewardId: string; description: string; expiryDate: Date; createdAt: Date }[]; // Lịch sử điểm
}

// UpdateCustomerLoyaltyPointsDTO: Dùng để cập nhật
export class UpdateCustomerLoyaltyPointsDTO {
  currentPoints?: number; // Điểm hiện tại
  totalPointsEarned?: number; // Tổng điểm kiếm được
  totalPointsRedeemed?: number; // Tổng điểm đã đổi
  tier?: string; // Cấp bậc
  pointsHistory?: { type: string; points: number; orderId: string; rewardId: string; description: string; expiryDate: Date; createdAt: Date }[]; // Lịch sử điểm
}