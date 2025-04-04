// CustomerGroupDTO: Đại diện toàn bộ schema
export class CustomerGroupDTO {
  groupId: string; // Mã nhóm
  name: string; // Tên nhóm
  discountType: string; // Loại chiết khấu
  discountValue: number; // Giá trị chiết khấu
  description: string; // Mô tả
  createdAt: Date; // Thời gian tạo
}

// CreateCustomerGroupDTO: Dùng để tạo mới
export class CreateCustomerGroupDTO {
  name: string; // Tên nhóm
  discountType: string; // Loại chiết khấu
  discountValue: number; // Giá trị chiết khấu
  description: string; // Mô tả
}

// UpdateCustomerGroupDTO: Dùng để cập nhật
export class UpdateCustomerGroupDTO {
  name?: string; // Tên nhóm
  discountType?: string; // Loại chiết khấu
  discountValue?: number; // Giá trị chiết khấu
  description?: string; // Mô tả
}