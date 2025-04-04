export class StoreDTO {
  storeId: string;
  name: string; // Tên cửa hàng
  phone: string; // Số điện thoại
  country: string; // Quốc gia
  region: string; // Khu vực
  businessIndustry: string; // Ngành hàng kinh doanh
  managerId: string; // ID tài khoản chính
  status: string;
  createdAt: Date;
  address?: string;
  email?: string;
  settings?: { timezone: string };
  servicePackage?: string;
  branches?: string[];
  paymentMethods?: string[];
}

export class CreateStoreDTO {
  name: string; // Bắt buộc - Tên cửa hàng
  phone: string; // Bắt buộc - Số điện thoại
  country: string; // Bắt buộc - Quốc gia
  region: string; // Bắt buộc - Khu vực
  businessIndustry: string; // Bắt buộc - Ngành hàng kinh doanh
  managerId: string; // Bắt buộc - ID tài khoản chính (tạo cùng lúc với User)
  status?: string; // Tùy chọn, mặc định là 'active'
  address?: string; // Tùy chọn
  email?: string; // Tùy chọn
  settings?: { timezone: string }; // Tùy chọn
  servicePackage?: string; // Tùy chọn
}

export class UpdateStoreDTO {
  name?: string;
  phone?: string;
  country?: string;
  region?: string;
  businessIndustry?: string;
  managerId?: string;
  status?: string;
  address?: string;
  email?: string;
  settings?: { timezone: string };
  servicePackage?: string;
  branches?: string[];
  paymentMethods?: string[];
} 