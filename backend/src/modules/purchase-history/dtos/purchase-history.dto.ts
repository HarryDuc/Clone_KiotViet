// PurchaseHistoryDTO: Đại diện toàn bộ schema
export class PurchaseHistoryDTO {
  purchaseHistoryId: string; // Mã lịch sử mua hàng
  storeId: string; // Mã cửa hàng
  packageId: string; // Mã gói dịch vụ
  purchaseDate: Date; // Ngày mua
  amount: number; // Số tiền
  status: string; // Trạng thái
  createdAt: Date; // Thời gian tạo
}

// CreatePurchaseHistoryDTO: Dùng để tạo mới
export class CreatePurchaseHistoryDTO {
  storeId: string; // Mã cửa hàng
  packageId: string; // Mã gói dịch vụ
  purchaseDate: Date; // Ngày mua
  amount: number; // Số tiền
  status: string; // Trạng thái
}

// UpdatePurchaseHistoryDTO: Dùng để cập nhật
export class UpdatePurchaseHistoryDTO {
  purchaseDate?: Date; // Ngày mua
  amount?: number; // Số tiền
  status?: string; // Trạng thái
}