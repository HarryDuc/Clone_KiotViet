export class BrandDTO {
  brandId: string;
  name: string;
  createdAt: Date;
  logo: string; // Thêm
  description: string; // Thêm
}

export class CreateBrandDTO {
  name: string;
  logo?: string; // Tùy chọn
  description?: string; // Tùy chọn
}

export class UpdateBrandDTO {
  name?: string;
  logo?: string; // Tùy chọn
  description?: string; // Tùy chọn
}