// 📁 src/modules/profile/repositories/profileRepository.ts

import axios, { AxiosResponse } from "axios";

// Lấy API_URL từ biến môi trường .env hoặc sử dụng giá trị mặc định
const API_URL = process.env.NEXT_PUBLIC_API_URL;

// 🆕 Định nghĩa kiểu dữ liệu cho hồ sơ người dùng
export interface UserProfile {
    id: string;
    email: string;
    fullName?: string;
    avatarUrl?: string;
    phoneNumber?: string;
    role: string; // Role mới: "user", "admin", "employee", "manager", "technical"
    status: string; // Trạng thái người dùng: "active", "offline", "banned"
}

// 🆕 Định nghĩa kiểu dữ liệu cho yêu cầu cập nhật hồ sơ người dùng
export interface UpdateUserProfileParams {
    fullName?: string;
    email?: string;
    avatarUrl?: string;
    phoneNumber?: string;
    role?: string; // Role mới (tùy chọn)
    status?: string; // Trạng thái người dùng (tùy chọn)
}

/**
 * 📥 Lấy thông tin hồ sơ người dùng qua API
 */
export const getUserProfile = async (token: string): Promise<UserProfile> => {
    console.log("🚀 Gọi API lấy thông tin hồ sơ người dùng...");
    try {
        const response: AxiosResponse<UserProfile> = await axios.get(`${API_URL}/auth/me`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        console.log("✅ Lấy thông tin hồ sơ người dùng thành công:", response.data);
        return response.data;
    } catch (error: any) {
        console.error("❌ Lỗi khi lấy hồ sơ người dùng:", error?.response?.data || error.message);
        throw new Error("Không thể lấy thông tin hồ sơ người dùng.");
    }
};

/**
 * 📝 Cập nhật hồ sơ người dùng qua API
 */
export const updateUserProfile = async (
    token: string,
    profileData: UpdateUserProfileParams
): Promise<UserProfile> => {
    console.log("🚀 Gọi API cập nhật thông tin hồ sơ người dùng...");
    try {
        const response: AxiosResponse<UserProfile> = await axios.put(
            `${API_URL}/auth/update`,
            profileData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );

        console.log("✅ Cập nhật thông tin hồ sơ thành công:", response.data);
        return response.data;
    } catch (error: any) {
        console.error("❌ Lỗi khi cập nhật hồ sơ người dùng:", error?.response?.data || error.message);
        throw new Error("Không thể cập nhật thông tin hồ sơ người dùng.");
    }
};
