// CustomerDTO: Đại diện toàn bộ schema
export class CustomerDTO {
  customerId: string; // Mã khách hàng
  name: string; // Tên
  phone: string; // Số điện thoại
  email: string; // Email
  address: string; // Địa chỉ
  customerType: string; // Loại khách hàng
  taxCode: string; // Mã số thuế
  idCard: string; // CMND/CCCD
  group: string; // Mã nhóm
  debt: number; // Nợ
  totalSales: number; // Tổng doanh số
  status: string; // Trạng thái
  createdAt: Date; // Thời gian tạo
}

// CreateCustomerDTO: Dùng để tạo mới
export class CreateCustomerDTO {
  name: string; // Tên
  phone: string; // Số điện thoại
  email: string; // Email
  address: string; // Địa chỉ
  customerType: string; // Loại khách hàng
  taxCode: string; // Mã số thuế
  idCard: string; // CMND/CCCD
  group: string; // Mã nhóm
  status: string; // Trạng thái
}

// UpdateCustomerDTO: Dùng để cập nhật
export class UpdateCustomerDTO {
  name?: string; // Tên
  phone?: string; // Số điện thoại
  email?: string; // Email
  address?: string; // Địa chỉ
  customerType?: string; // Loại khách hàng
  taxCode?: string; // Mã số thuế
  idCard?: string; // CMND/CCCD
  group?: string; // Mã nhóm
  status?: string; // Trạng thái
}