import axios from "axios";
import { User, RegisterUserDto } from "../types/user.type";
import { Product } from "@/modules/products/types/product.type";

const API_URL = process.env.NEXT_PUBLIC_API_URL + "/auth";

console.log("🚀 API_URL:", API_URL);

export const UsersService = {

    async create(data: RegisterUserDto): Promise<User> {
        try {
            console.log("📤 Gửi dữ liệu user:", JSON.stringify(data, null, 2));

            const response = await axios.post(`${API_URL}/register`, data, {
                headers: { "Content-Type": "application/json" },
            });

            console.log("✅ Phản hồi từ server sau khi tạo sản phẩm:", response.data);
            return response.data;
        } catch (error: any) {  
            console.error("❌ Lỗi khi tạo sản phẩm:", error.response?.data || error.message);
            throw new Error(error.response?.data?.message || "Đã xảy ra lỗi khi tạo sản phẩm.");
        }
    }
};
