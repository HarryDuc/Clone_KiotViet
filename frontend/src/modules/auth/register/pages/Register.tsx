"use client";

import { useRouter } from "next/navigation";
import { UsersService } from "../services/user.service";
import { RegisterUserDto } from "../types/user.type";
import { RegisterForm } from "../components/register.form";

const Register = () => {
    const router = useRouter();

    const handleCreateUser = async (formData: FormData) => {
        try {
            console.log("🚀 Bắt đầu xử lý tạo sản phẩm...");
            console.log("📤 Dữ liệu FormData gửi đi:", Array.from(formData.entries()));

            console.log("📤 Gửi yêu cầu upload ảnh...");

            const userData: RegisterUserDto = {
                username: formData.get("username") as string,
                password: formData.get("password") as string,
                fullName: formData.get("fullName") as string,
                role: formData.get("role") as string,
                email: formData.get("email") as string,
                phone: formData.get("phone") as string,
            };

            console.log("📦 Dữ liệu sản phẩm gửi đi:", JSON.stringify(userData, null, 2));

            const response = await UsersService.create(userData);

            if (!response) {
                console.error("❌ Không thể dăng ký trên server!");
                throw new Error("❌ Không thể dăng ký trên server!");  
            }

            console.log("✅ Đăng ký thành công:", response);
        } catch (error) {
            console.error("❌ Lỗi khi đăng ký:", error);
        }
    };


    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-xl font-semibold text-center text-blue-600 mb-4">🛍️ Đăng ký tài khoản</h2>
            <RegisterForm onSubmit={handleCreateUser} />
        </div>
    );
};

export default Register;
