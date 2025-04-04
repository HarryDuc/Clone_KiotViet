// ShipmentDTO: Đại diện toàn bộ schema
export class ShipmentDTO {
  shipmentId: string; // Mã vận chuyển
  storeId: string; // Mã cửa hàng
  orderId: string; // Mã đơn hàng
  customerId: string; // Mã khách hàng
  shippingAddress: string; // Địa chỉ giao hàng
  status: string; // Trạng thái
  createdAt: Date; // Thời gian tạo
}

// CreateShipmentDTO: Dùng để tạo mới
export class CreateShipmentDTO {
  storeId: string; // Mã cửa hàng
  orderId: string; // Mã đơn hàng
  customerId: string; // Mã khách hàng
  shippingAddress: string; // Địa chỉ giao hàng
  status: string; // Trạng thái
}

// UpdateShipmentDTO: Dùng để cập nhật
export class UpdateShipmentDTO {
  shippingAddress?: string; // Địa chỉ giao hàng (tùy chọn)
  status?: string; // Trạng thái (tùy chọn)
}