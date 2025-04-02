/**
 * 📌 Định nghĩa kiểu dữ liệu sản phẩm (Product)
 */
export type Product = {
    // {
    //     "_id": "67eb9dc34d137eb0d1836463",
    //     "productId": "SP0006",
    //     "barcode": "8938505974123",
    //     "name": "Bánh quy sữa",
    //     "category": null,
    //     "brand": null,
    //     "price": 25000,
    //     "cost": 18000,
    //     "stock": 100,
    //     "location": "Kệ A3",
    //     "minStock": 10,
    //     "maxStock": 200,
    //     "status": "Ngừng kinh doanh",
    //     "image": "https://khoinguonsangtao.vn/wp-content/uploads/2022/08/anh-dong-3d-cau-vong.gif",
    //     "weight": 250,
    //     "unit": "gram",
    //     "description": "Bánh quy sữa thơm ngon, giòn rụm, thích hợp dùng kèm trà hoặc sữa.",
    //     "createdAt": "2025-04-01T08:03:15.698Z",
    //     "updatedAt": "2025-04-01T08:03:15.698Z",
    //     "__v": 0
    // }
    _id: string; // MongoDB sử dụng `_id` thay vì `id`
    name: string;
    description: string;

    /** 📌 Danh mục sản phẩm */
    category: string;
    minStock: number;
    maxStock: number;
    stock: number;
    weight: number;
    unit: string;
    location: string;
    /** 📌 Giá cả */
    cost: number; // Giá nhập vào
    price: number; // Giá bán ra

    /** 📌 Hình ảnh sản phẩm */
    image: string | string[]; // ✅ Ảnh đại diện + ảnh chính (hỗ trợ cả string và string[])


    /** 📌 Trạng thái sản phẩm */
    status?: "Ngừng kinh doanh" | "Đang kinh doanh" | "Đã bán hết"; // ✅ Trạng thái hiện tại


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
    image: string[]; // ✅ Cập nhật để tránh lỗi "images does not exist in CreateProductDto"
};

/**
 * 📌 DTO để cập nhật sản phẩm
 * ✅ Có thể cập nhật từng phần
 */
export type UpdateProductDto = Partial<Omit<Product, "_id" | "createdAt">>;
