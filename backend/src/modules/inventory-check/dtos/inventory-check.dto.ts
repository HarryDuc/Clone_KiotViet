// InventoryCheckDTO: Đại diện toàn bộ schema
export class InventoryCheckDTO {
  checkId: string; // Mã kiểm kê
  storeId: string; // Mã cửa hàng
  warehouseId: string; // Mã kho
  checkDate: Date; // Ngày kiểm kê
  type: string; // Loại kiểm kê
  status: string; // Trạng thái
  items: { productId: string; systemQuantity: number; actualQuantity: number; difference: number; unitPrice: number; totalValue: number; notes: string }[]; // Chi tiết
  totalItems: number; // Tổng sản phẩm
  totalValue: number; // Tổng giá trị
  totalDifference: number; // Tổng chênh lệch
  checkedBy: string; // Mã nhân viên kiểm kê
  verifiedBy: string; // Mã nhân viên xác nhận
  attachments: string[]; // Tệp đính kèm
  notes: string; // Ghi chú
}

// CreateInventoryCheckDTO: Dùng để tạo mới
export class CreateInventoryCheckDTO {
  storeId: string; // Mã cửa hàng
  warehouseId: string; // Mã kho
  checkDate: Date; // Ngày kiểm kê
  type: string; // Loại kiểm kê
  status: string; // Trạng thái
  items: { productId: string; systemQuantity: number; actualQuantity: number; difference: number; unitPrice: number; totalValue: number; notes: string }[]; // Chi tiết
  totalItems: number; // Tổng sản phẩm
  totalValue: number; // Tổng giá trị
  totalDifference: number; // Tổng chênh lệch
  checkedBy: string; // Mã nhân viên kiểm kê
  verifiedBy: string; // Mã nhân viên xác nhận
  attachments: string[]; // Tệp đính kèm
  notes: string; // Ghi chú
}

// UpdateInventoryCheckDTO: Dùng để cập nhật
export class UpdateInventoryCheckDTO {
  checkDate?: Date; // Ngày kiểm kê
  type?: string; // Loại kiểm kê
  status?: string; // Trạng thái
  items?: { productId: string; systemQuantity: number; actualQuantity: number; difference: number; unitPrice: number; totalValue: number; notes: string }[]; // Chi tiết
  totalItems?: number; // Tổng sản phẩm
  totalValue?: number; // Tổng giá trị
  totalDifference?: number; // Tổng chênh lệch
  checkedBy?: string; // Mã nhân viên kiểm kê
  verifiedBy?: string; // Mã nhân viên xác nhận
  attachments?: string[]; // Tệp đính kèm
  notes?: string; // Ghi chú
}