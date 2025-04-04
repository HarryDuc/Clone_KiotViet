// OrderDTO: Đại diện toàn bộ schema
export class OrderDTO {
  orderId: string; // Mã đơn hàng
  orderCode: string; // Mã hiển thị
  customerId: string; // Mã khách hàng
  products: { productId: string; quantity: number; price: number; discount: number }[]; // Sản phẩm
  totalAmount: number; // Tổng tiền
  discount: number; // Chiết khấu
  paymentMethod: string; // Phương thức thanh toán
  status: string; // Trạng thái
  channel: string; // Mã kênh
  carrierId: string; // Mã đơn vị vận chuyển
  deliveryDate: Date; // Ngày giao hàng
}

// CreateOrderDTO: Dùng để tạo mới
export class CreateOrderDTO {
  customerId: string; // Mã khách hàng
  products: { productId: string; quantity: number; price: number; discount: number }[]; // Sản phẩm
  totalAmount: number; // Tổng tiền
  discount: number; // Chiết khấu
  paymentMethod: string; // Phương thức thanh toán
  status: string; // Trạng thái
  channel: string; // Mã kênh
  carrierId: string; // Mã đơn vị vận chuyển
  deliveryDate: Date; // Ngày giao hàng
}

// UpdateOrderDTO: Dùng để cập nhật
export class UpdateOrderDTO {
  customerId?: string; // Mã khách hàng
  products?: { productId: string; quantity: number; price: number; discount: number }[]; // Sản phẩm
  totalAmount?: number; // Tổng tiền
  discount?: number; // Chiết khấu
  paymentMethod?: string; // Phương thức thanh toán
  status?: string; // Trạng thái
  channel?: string; // Mã kênh
  carrierId?: string; // Mã đơn vị vận chuyển
  deliveryDate?: Date; // Ngày giao hàng
}