// InvoiceDTO: Đại diện toàn bộ schema
export class InvoiceDTO {
  invoiceId: string; // Mã hóa đơn
  storeId: string; // Mã cửa hàng
  orderId: string; // Mã đơn hàng
  customerId: string; // Mã khách hàng
  invoiceNumber: string; // Số hóa đơn
  invoiceDate: Date; // Ngày hóa đơn
  dueDate: Date; // Ngày đến hạn
  items: { productId: string; quantity: number; unitPrice: number; discount: number; total: number }[]; // Chi tiết
  subtotal: number; // Tạm tính
  tax: number; // Thuế
  shipping: number; // Phí vận chuyển
  total: number; // Tổng cộng
  paymentMethod: string; // Phương thức thanh toán
  paymentStatus: string; // Trạng thái thanh toán
  notes: string; // Ghi chú
  status: string; // Trạng thái
}

// CreateInvoiceDTO: Dùng để tạo mới
export class CreateInvoiceDTO {
  storeId: string; // Mã cửa hàng
  orderId: string; // Mã đơn hàng
  customerId: string; // Mã khách hàng
  invoiceNumber: string; // Số hóa đơn
  invoiceDate: Date; // Ngày hóa đơn
  dueDate: Date; // Ngày đến hạn
  items: { productId: string; quantity: number; unitPrice: number; discount: number; total: number }[]; // Chi tiết
  subtotal: number; // Tạm tính
  tax: number; // Thuế
  shipping: number; // Phí vận chuyển
  total: number; // Tổng cộng
  paymentMethod: string; // Phương thức thanh toán
  paymentStatus: string; // Trạng thái thanh toán
  notes: string; // Ghi chú
  status: string; // Trạng thái
}

// UpdateInvoiceDTO: Dùng để cập nhật
export class UpdateInvoiceDTO {
  invoiceNumber?: string; // Số hóa đơn
  invoiceDate?: Date; // Ngày hóa đơn
  dueDate?: Date; // Ngày đến hạn
  items?: { productId: string; quantity: number; unitPrice: number; discount: number; total: number }[]; // Chi tiết
  subtotal?: number; // Tạm tính
  tax?: number; // Thuế
  shipping?: number; // Phí vận chuyển
  total?: number; // Tổng cộng
  paymentMethod?: string; // Phương thức thanh toán
  paymentStatus?: string; // Trạng thái thanh toán
  notes?: string; // Ghi chú
  status?: string; // Trạng thái
}