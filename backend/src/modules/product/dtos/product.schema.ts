// ProductDTO: Đại diện toàn bộ schema
export class ProductDTO {
  productId: string; // Mã sản phẩm
  barcode: string; // Mã vạch
  name: string; // Tên
  category: string; // Mã danh mục
  brand: string; // Mã thương hiệu
  price: number; // Giá bán
  cost: number; // Giá vốn
  stock: number; // Tồn kho
  location: string; // Vị trí
  minStock: number; // Tồn kho tối thiểu
  maxStock: number; // Tồn kho tối đa
  status: string; // Trạng thái
  image: string; // Ảnh
  weight: number; // Trọng lượng
  unit: string; // Đơn vị
  description: string; // Mô tả
  images: string[]; // Danh sách ảnh
  reviews: { userId: string; rating: number; comment: string; createdAt: Date }[]; // Đánh giá
}

// CreateProductDTO: Dùng để tạo mới
export class CreateProductDTO {
  name: string; // Tên
  barcode: string; // Mã vạch
  category: string; // Mã danh mục
  brand: string; // Mã thương hiệu
  price: number; // Giá bán
  cost: number; // Giá vốn
  stock: number; // Tồn kho
  location: string; // Vị trí
  minStock: number; // Tồn kho tối thiểu
  maxStock: number; // Tồn kho tối đa
  status: string; // Trạng thái
  image: string; // Ảnh
  weight: number; // Trọng lượng
  unit: string; // Đơn vị
  description: string; // Mô tả
  images: string[]; // Danh sách ảnh
}

// UpdateProductDTO: Dùng để cập nhật
export class UpdateProductDTO {
  name?: string; // Tên
  barcode?: string; // Mã vạch
  category?: string; // Mã danh mục
  brand?: string; // Mã thương hiệu
  price?: number; // Giá bán
  cost?: number; // Giá vốn
  stock?: number; // Tồn kho
  location?: string; // Vị trí
  minStock?: number; // Tồn kho tối thiểu
  maxStock?: number; // Tồn kho tối đa
  status?: string; // Trạng thái
  image?: string; // Ảnh
  weight?: number; // Trọng lượng
  unit?: string; // Đơn vị
  description?: string; // Mô tả
  images?: string[]; // Danh sách ảnh
  reviews?: { userId: string; rating: number; comment: string; createdAt: Date }[]; // Đánh giá
}