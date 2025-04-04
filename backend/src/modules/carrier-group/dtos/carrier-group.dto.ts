// CarrierGroupDTO: Đại diện toàn bộ schema
export class CarrierGroupDTO {
    groupId: string; // Mã nhóm
    name: string; // Tên nhóm
    description: string; // Mô tả
    createdAt: Date; // Thời gian tạo
  }
  
  // CreateCarrierGroupDTO: Dùng để tạo mới
  export class CreateCarrierGroupDTO {
    name: string; // Tên nhóm
    description: string; // Mô tả
  }
  
  // UpdateCarrierGroupDTO: Dùng để cập nhật
  export class UpdateCarrierGroupDTO {
    name?: string; // Tên nhóm
    description?: string; // Mô tả
  }