export class SupplierGroupDTO {
  groupId: string;
  name: string;
  description: string;
  status: string;
  createdAt: Date;
  suppliers: string[]; // Thêm
}

export class CreateSupplierGroupDTO {
  name: string;
  description: string;
  status: string;
  suppliers?: string[]; // Tùy chọn
}

export class UpdateSupplierGroupDTO {
  name?: string;
  description?: string;
  status?: string;
  suppliers?: string[]; // Tùy chọn
}