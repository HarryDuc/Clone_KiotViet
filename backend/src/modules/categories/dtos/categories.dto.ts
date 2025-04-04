// CategoriesDTO: Đại diện toàn bộ schema
export class CategoriesDTO {
  categoryId: string; // Mã danh mục
  name: string; // Tên danh mục
  parentCategory: string; // Mã danh mục cha
  createdAt: Date; // Thời gian tạo
}

// CreateCategoriesDTO: Dùng để tạo mới
export class CreateCategoriesDTO {
  name: string; // Tên danh mục
  parentCategory: string; // Mã danh mục cha
}

// UpdateCategoriesDTO: Dùng để cập nhật
export class UpdateCategoriesDTO {
  name?: string; // Tên danh mục
  parentCategory?: string; // Mã danh mục cha
}