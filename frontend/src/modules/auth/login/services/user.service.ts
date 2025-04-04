import axios from "axios";
import { User, LoginUserDto } from "../types/user.type";
import { Product } from "@/modules/products/types/product.type";

const API_URL = process.env.NEXT_PUBLIC_API_URL + "/auth";

console.log("🚀 API_URL:", API_URL);

export const UsersService = {

    async login(data: LoginUserDto): Promise<User> {
        try {
            const response = await axios.post(`${API_URL}/login`, data, {
                headers: { "Content-Type": "application/json" },
            });
            return response.data;
        } catch (error: any) {
            console.error("❌ Lỗi khi đăng nhập:", error.response?.data || error.message);
            throw new Error(error.response?.data?.message || "Đã xảy ra lỗi khi đăng nhập.");
        }
    },
};
