import axios from "axios";
import { Product, CreateProductDto, UpdateProductDto } from "../types/product.type";

// 🌐 Load biến môi trường từ `.env`
const API_URL = process.env.NEXT_PUBLIC_API_URL + "/products";

console.log("🚀 API_URL:", API_URL); // ✅ Kiểm tra giá trị URL

export const ProductsService = {
    /**
     * 📌 Lấy danh sách tất cả sản phẩm
     */
    async getAll(): Promise<Product[]> {
        try {
            console.log("📥 Gửi request lấy danh sách sản phẩm...");
            const response = await axios.get(API_URL);
            console.log("✅ Danh sách sản phẩm:", response.data);
            return response.data;
        } catch (error) {
            console.error("❌ Lỗi khi lấy danh sách sản phẩm:", error);
            throw error;
        }
    },

    /**
     * 📌 Lấy thông tin sản phẩm theo ID
     */
    async getById(id: string): Promise<Product> {
        try {
            console.log(`📥 Lấy thông tin sản phẩm với ID: ${id}`);
            const response = await axios.get(`${API_URL}/${id}`);
            console.log(`✅ Thông tin sản phẩm ${id}:`, response.data);
            return response.data;
        } catch (error) {
            console.error(`❌ Lỗi khi lấy sản phẩm ID ${id}:`, error);
            throw error;
        }
    },

    /**
     * 📌 Upload ảnh trực tiếp lên backend
     */
    async uploadImages(files: File[]): Promise<string[]> {
        try {
            if (!files || files.length === 0) {
                console.warn("⚠️ Không có ảnh nào để tải lên.");
                return [];
            }

            console.log(`📤 Đang gửi request upload ${files.length} ảnh...`);
            const formData = new FormData();
            files.forEach((file) => formData.append("images", file));

            const response = await axios.post(`${API_URL}/upload`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            console.log("✅ API response từ backend:", response.data);

            if (!response.data || !response.data.urls) {
                throw new Error("❌ API không trả về danh sách URL ảnh!");
            }

            return response.data.urls; // ✅ Trả về danh sách ảnh từ backend
        } catch (error) {
            console.error("❌ Lỗi khi upload ảnh lên server:", error);
            throw error;
        }
    }
    ,

    /**
     * 📌 Tạo mới sản phẩm
     */
    async create(data: CreateProductDto): Promise<Product> {
        try {
            console.log("📤 Gửi dữ liệu sản phẩm:", JSON.stringify(data, null, 2));

            if (!data.image || data.image.length === 0) {
                console.error("❌ Lỗi: Không có hình ảnh nào trong `imageUrls`!");
                throw new Error("Vui lòng chọn ít nhất một ảnh sản phẩm.");
            }

            const response = await axios.post(`${API_URL}/create`, data, {
                headers: { "Content-Type": "application/json" },
            });

            console.log("✅ Phản hồi từ server sau khi tạo sản phẩm:", response.data);
            return response.data;
        } catch (error: any) {
            console.error("❌ Lỗi khi tạo sản phẩm:", error.response?.data || error.message);
            throw new Error(error.response?.data?.message || "Đã xảy ra lỗi khi tạo sản phẩm.");
        }
    },


    /**
     * 📌 Cập nhật sản phẩm theo ID
     */
    async update(id: string, data: UpdateProductDto, files?: File[], removedImages?: string[]): Promise<Product> {
        try {
            console.log(`📤 Chuẩn bị cập nhật sản phẩm ID: ${id}`, data);

            let updatedData = { ...data };

            if (files && files.length > 0) {
                console.log(`📤 Đang tải lên ${files.length} ảnh mới...`);
                const imageUrls = await this.uploadImages(files);
                updatedData.image = [...(data.image || []), ...imageUrls];
            }

            if (removedImages && removedImages.length > 0) {
                console.log(`🗑️ Đang xóa ${removedImages.length} ảnh khỏi gallery.`);
                updatedData.image = Array.isArray(updatedData.image) 
                    ? updatedData.image.filter((img: string) => !removedImages.includes(img))
                    : [];
            }

            const response = await axios.put(`${API_URL}/${id}`, updatedData);
            console.log(`✅ Sản phẩm ID ${id} đã được cập nhật.`, response.data);
            return response.data;
        } catch (error) {
            console.error(`❌ Lỗi khi cập nhật sản phẩm ID ${id}:`, error);
            throw error;
        }
    },

    /**
     * 📌 Xóa sản phẩm theo ID
     */
    async delete(id: string): Promise<void> {
        try {
            console.log(`🗑️ Đang xóa sản phẩm ID: ${id}`);
            await axios.delete(`${API_URL}/${id}`);
            console.log(`✅ Sản phẩm ID ${id} đã được xóa.`);
        } catch (error) {
            console.error(`❌ Lỗi khi xóa sản phẩm ID ${id}:`, error);
            throw error;
        }
    },
};
