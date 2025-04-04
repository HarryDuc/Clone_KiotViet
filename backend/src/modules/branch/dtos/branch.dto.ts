export class BranchDTO {
  name: string;
  location: string;
  createdAt: Date;
  updatedAt: Date;
  managerId: string; // Thêm
  warehouseId: string; // Thêm
}

export class CreateBranchDTO {
  name: string;
  location: string;
  managerId?: string; // Tùy chọn
  warehouseId?: string; // Tùy chọn
}

export class UpdateBranchDTO {
  name?: string;
  location?: string;
  managerId?: string; // Tùy chọn
  warehouseId?: string; // Tùy chọn
}