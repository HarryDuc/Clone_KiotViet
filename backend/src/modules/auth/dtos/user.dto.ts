import { CreateStoreDTO } from "src/modules/store/dtos/store.dto";

export class UserDTO {
  userId: string;
  username: string;
  password: string;
  fullName: string; // Họ tên
  phone: string; // Số điện thoại
  role: string; // Vai trò
  storeId: string; // ID cửa hàng
  isAdmin: boolean;
  createdAt: Date;
  email?: string;
  permissions?: string[];
  language?: string;
  authProvider?: string;
}

// DTO cho tài khoản chính (Store Owner)
export class CreateStoreOwnerDTO {
  fullName: string; // Bắt buộc - Họ tên
  phone: string; // Bắt buộc - Số điện thoại
  username: string; // Bắt buộc
  password: string; // Bắt buộc - Mật khẩu
  store: CreateStoreDTO; // Bắt buộc - Thông tin cửa hàng (nested)
  role?: string; // Mặc định 'admin'
  isAdmin?: boolean; // Mặc định true
  email?: string; // Tùy chọn
  permissions?: string[]; // Tùy chọn
  language?: string; // Tùy chọn
  authProvider?: string; // Tùy chọn
}

// DTO cho tài khoản nhân viên (Employee)
export class CreateEmployeeDTO {
  username: string; // Bắt buộc
  password: string; // Bắt buộc
  fullName: string; // Bắt buộc
  phone: string; // Bắt buộc
  storeId: string; // Bắt buộc - ID cửa hàng
  role?: string; // Mặc định 'employee'
  isAdmin?: boolean; // Mặc định false
  email?: string; // Tùy chọn
  permissions?: string[]; // Tùy chọn
  language?: string; // Tùy chọn
  authProvider?: string; // Tùy chọn
}

export class UpdateUserDTO {
  username?: string;
  password?: string;
  fullName?: string;
  phone?: string;
  role?: string;
  storeId?: string;
  isAdmin?: boolean;
  email?: string;
  permissions?: string[];
  language?: string;
  authProvider?: string;
}