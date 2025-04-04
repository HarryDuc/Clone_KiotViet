export class SupplierDTO {
  supplierId: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  group: string;
  status: string;
  createdAt: Date;
  products: string[]; // Thêm
  transactionHistory: string[]; // Thêm
}

export class CreateSupplierDTO {
  name: string;
  phone: string;
  email: string;
  address: string;
  group: string;
  status: string;
  products?: string[]; // Tùy chọn
  transactionHistory?: string[]; // Tùy chọn
}

export class UpdateSupplierDTO {
  name?: string;
  phone?: string;
  email?: string;
  address?: string;
  group?: string;
  status?: string;
  products?: string[]; // Tùy chọn
  transactionHistory?: string[]; // Tùy chọn
}