/**
 * 📌 Định nghĩa kiểu dữ liệu sản phẩm (Product)
 */
export type Product = {
    _id: string; // MongoDB sử dụng `_id` thay vì `id`
    name: string;
    slug: string;
    description: string;

    /** 📌 Danh mục sản phẩm */
    category: {
        main: string;
        sub: string;
        tags: string[];
    };

    /** 📌 Giá cả */
    costPrice: number; // Giá nhập vào
    originalPrice: number; // Giá gốc
    currentPrice: number; // Giá hiện tại (sau giảm giá nếu có)

    /** 📌 Hình ảnh sản phẩm */
    imageUrls: string[]; // ✅ Ảnh đại diện + ảnh chính
    gallery?: string[]; // ✅ Album ảnh chi tiết

    /** 📌 Đánh giá sản phẩm */
    rating?: {
        average: number; // Điểm đánh giá trung bình (0-5)
        totalReviews: number; // Tổng số lượt đánh giá
    };

    /** 📌 Các thông tin khác */
    isFeatured?: boolean; // ✅ Đánh dấu sản phẩm nổi bật
    totalSold?: number; // ✅ Tổng số lượng đã bán
    attributes?: Record<string, string | number | boolean>; // ✅ Thuộc tính mở rộng

    /** 📌 Trạng thái sản phẩm */
    status?: "available" | "out_of_stock" | "discontinued"; // ✅ Trạng thái hiện tại

    /** 📌 Thông tin giảm giá */
    discount?: Discount; // ✅ Nếu có giảm giá

    /** 📌 Thời gian tạo & cập nhật sản phẩm */
    createdAt?: string;
    updatedAt?: string;
};

/**
 * 📌 Kiểu dữ liệu giảm giá (Discount)
 */
export type Discount = {
    amount: number; // Giá trị giảm giá (có thể là % hoặc số tiền cụ thể)
    type: "percentage" | "fixed"; // ✅ Loại giảm giá
    expiresAt?: string; // ✅ Ngày hết hạn giảm giá (nếu có)
};

/**
 * 📌 DTO để tạo mới sản phẩm
 * ✅ Không có `_id` & tự động lấy thời gian tạo
 * ✅ Chỉnh `imageUrls` để phù hợp với dữ liệu gửi lên Backend
 */
export type CreateProductDto = Omit<Product, "_id" | "createdAt" | "updatedAt"> & {
    imageUrls: string[]; // ✅ Cập nhật để tránh lỗi "images does not exist in CreateProductDto"
};

/**
 * 📌 DTO để cập nhật sản phẩm
 * ✅ Có thể cập nhật từng phần
 */
export type UpdateProductDto = Partial<Omit<Product, "_id" | "createdAt">>;
