// SalesChannelDTO: Đại diện toàn bộ schema
export class SalesChannelDTO {
  channelId: string; // Mã kênh bán hàng
  storeId: string; // Mã cửa hàng
  name: string; // Tên kênh
  type: string; // Loại kênh
  status: string; // Trạng thái
  createdAt: Date; // Thời gian tạo
}

// CreateSalesChannelDTO: Dùng để tạo mới
export class CreateSalesChannelDTO {
  storeId: string; // Mã cửa hàng
  name: string; // Tên kênh
  type: string; // Loại kênh
  status: string; // Trạng thái
}

// UpdateSalesChannelDTO: Dùng để cập nhật
export class UpdateSalesChannelDTO {
  name?: string; // Tên kênh (tùy chọn)
  type?: string; // Loại kênh (tùy chọn)
  status?: string; // Trạng thái (tùy chọn)
}