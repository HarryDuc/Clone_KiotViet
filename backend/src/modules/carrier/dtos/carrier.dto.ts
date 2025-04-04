// CarrierDTO: Đại diện toàn bộ schema
export class CarrierDTO {
    carrierId: string; // Mã đơn vị vận chuyển
    name: string; // Tên
    phone: string; // Số điện thoại
    email: string; // Email
    address: string; // Địa chỉ
    group: string; // Mã nhóm
    totalOrders: number; // Tổng đơn hàng
    totalFees: number; // Tổng phí
    status: string; // Trạng thái
    createdAt: Date; // Thời gian tạo
    updatedAt: Date; // Thời gian cập nhật
  }
  
  // CreateCarrierDTO: Dùng để tạo mới
  export class CreateCarrierDTO {
    name: string; // Tên
    phone: string; // Số điện thoại
    email: string; // Email
    address: string; // Địa chỉ
    group: string; // Mã nhóm
    status: string; // Trạng thái
  }
  
  // UpdateCarrierDTO: Dùng để cập nhật
  export class UpdateCarrierDTO {
    name?: string; // Tên
    phone?: string; // Số điện thoại
    email?: string; // Email
    address?: string; // Địa chỉ
    group?: string; // Mã nhóm
    status?: string; // Trạng thái
  }