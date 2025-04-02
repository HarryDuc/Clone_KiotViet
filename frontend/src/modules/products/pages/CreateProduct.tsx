"use client";

import { useRouter } from "next/navigation";
import { ProductsService } from "../services/products.service";
import { ProductForm } from "../components/ProductForm";
import { CreateProductDto } from "../types/products.types";

const CreateProduct = () => {
    const router = useRouter();

    // ✅ Xử lý dữ liệu từ `ProductForm` và gửi đến backend
    const handleCreateProduct = async (formData: FormData) => {
        try {
            console.log("🚀 Bắt đầu xử lý tạo sản phẩm...");
            console.log("📤 Dữ liệu FormData gửi đi:", Array.from(formData.entries()));

            // 🖼️ Lấy danh sách ảnh
            const thumbnailFile = formData.get("thumbnail") as File | null;
            const galleryFiles = formData.getAll("gallery") as File[];

            if (!thumbnailFile) {
                console.error("❌ Vui lòng chọn ảnh đại diện cho sản phẩm!");
                return;
            }

            // 🚀 Upload tất cả ảnh
            const allFiles = [thumbnailFile, ...galleryFiles];
            console.log("📤 Gửi yêu cầu upload ảnh...");
            const uploadedUrls = await ProductsService.uploadImages(allFiles);

            if (!uploadedUrls || uploadedUrls.length === 0) {
                throw new Error("❌ API không trả về danh sách URL ảnh!");
            }

            console.log("✅ Ảnh đã upload thành công, danh sách URL:", uploadedUrls);

            // ✅ Chuyển dữ liệu sang object `CreateProductDto`
            const productData: CreateProductDto = {
                name: formData.get("name") as string,
                slug: (formData.get("slug") as string) || "",
                description: formData.get("description") as string,
                category: {
                    main: formData.get("categoryMain") as string,
                    sub: formData.get("categorySub") as string,
                    tags: (formData.getAll("tags[]") as string[]) || [],
                },
                costPrice: Number(formData.get("costPrice")),
                originalPrice: Number(formData.get("originalPrice")),
                currentPrice: Number(formData.get("currentPrice")),
                imageUrls: uploadedUrls, // ✅ Đảm bảo `imageUrls` được gửi đi
            };

            console.log("📦 Dữ liệu sản phẩm gửi đi:", JSON.stringify(productData, null, 2));

            // 🚀 Gửi dữ liệu sản phẩm lên backend
            const response = await ProductsService.create(productData);

            if (!response || !response._id) {
                console.error("❌ Không thể tạo sản phẩm trên server!");
                throw new Error("❌ Không thể tạo sản phẩm trên server!");
            }

            console.log("✅ Sản phẩm đã được tạo thành công:", response);
        } catch (error) {
            console.error("❌ Lỗi khi tạo sản phẩm:", error);
        }
    };


    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-xl font-semibold text-center text-blue-600 mb-4">🛍️ Thêm Sản Phẩm</h2>
            <ProductForm onSubmit={handleCreateProduct} />
        </div>
    );
};

export default CreateProduct;
