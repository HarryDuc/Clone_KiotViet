"use client";

import { useRouter } from "next/navigation";
import { UsersService } from "../services/user.service";
import { LoginUserDto } from "../types/user.type";
import { LoginForm } from "../components/login.form";

const Login = () => {
    const router = useRouter();

    const handleLogin = async (formData: FormData) => {
        try {
            console.log("🚀 Bắt đầu xử lý đăng nhập...");
            console.log("📤 Dữ liệu FormData gửi đi:", Array.from(formData.entries()));

            console.log("📤 Gửi yêu cầu đăng nhập...");

            const userData: LoginUserDto = {
                username: formData.get("username") as string,
                password: formData.get("password") as string,
                fullName: formData.get("fullName") as string,
                role: formData.get("role") as string,
                email: formData.get("email") as string,
                phone: formData.get("phone") as string,
            };

            console.log("📦 Dữ liệu tài khoản gửi đi:", JSON.stringify(userData, null, 2));

            const response = await UsersService.login(userData);

            if (!response) {
                console.error("❌ Không thể đăng nhập trên server!");
                throw new Error("❌ Không thể đăng nhập trên server!");  
            }

            console.log("✅ Đăng nhập thành công:", response);
        } catch (error) {
            console.error("❌ Lỗi khi đăng nhập:", error);
        }
    };


    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-xl font-semibold text-center text-blue-600 mb-4">🛍️ Đăng nhập tài khoản</h2>
            <LoginForm onSubmit={handleLogin} />
        </div>
    );
};

export default Login;
