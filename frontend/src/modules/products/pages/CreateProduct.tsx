"use client";

import { useRouter } from "next/navigation";
import { ProductsService } from "../services/product.service";
import { ProductForm } from "../components/product.form";
import { CreateProductDto } from "../types/product.type";

const CreateProduct = () => {
    const router = useRouter();

    const handleCreateProduct = async (formData: FormData) => {
        try {
            console.log("🚀 Bắt đầu xử lý tạo sản phẩm...");
            console.log("📤 Dữ liệu FormData gửi đi:", Array.from(formData.entries()));

            console.log("📤 Gửi yêu cầu upload ảnh...");

            const productData: CreateProductDto = {
                name: formData.get("name") as string,
                description: formData.get("description") as string,
                category: formData.get("category") as string,
                location: formData.get("location") as string,
                minStock: Number(formData.get("minStock")),
                maxStock: Number(formData.get("maxStock")), 
                stock: Number(formData.get("stock")),
                weight: Number(formData.get("weight")),
                unit: formData.get("unit") as string,
                cost: Number(formData.get("cost")),
                price: Number(formData.get("price")),
                image: formData.get("image") as string
            };

            console.log("📦 Dữ liệu sản phẩm gửi đi:", JSON.stringify(productData, null, 2));

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
