import axios from "axios";
import { User, CreateUserDto, UpdateUserDto } from "../types/user.type";
import { Product } from "@/modules/products/types/product.type";

const API_URL = process.env.NEXT_PUBLIC_API_URL + "/auth";

console.log("🚀 API_URL:", API_URL);

export const UsersService = {

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

    async create(data: CreateUserDto): Promise<User> {
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
    },

    async login(data: any): Promise<User> {
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


    async update(id: string, data: UpdateUserDto): Promise<Product> {
        try {
            console.log(`📤 Chuẩn bị cập nhật sản phẩm ID: ${id}`, data);

            let updatedData = { ...data };


            const response = await axios.patch(`${API_URL}/${id}`, updatedData);
            console.log(`✅ Sản phẩm ID ${id} đã được cập nhật.`, response.data);
            return response.data;
        } catch (error) {
            console.error(`❌ Lỗi khi cập nhật sản phẩm ID ${id}:`, error);
            throw error;
        }
    }
};
