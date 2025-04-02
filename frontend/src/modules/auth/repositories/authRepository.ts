// 📁 src/modules/auth/repositories/authRepository.ts
import { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";

// 🌐 Lấy API_URL từ biến môi trường .env hoặc sử dụng giá trị mặc định
const API_URL = process.env.NEXT_PUBLIC_API_URL;

// 🆕 Định nghĩa kiểu dữ liệu cho tham số đăng nhập
interface LoginParams {
  email: string;
  password: string;
}

// 🆕 Định nghĩa các giá trị hợp lệ cho role người dùng
export type UserRole = "user" | "admin" | "staff" | "manager" | "technical";

// 🆕 Định nghĩa kiểu dữ liệu trả về từ API đăng nhập
export interface LoginResponse {
  message: string;
  token: string;
  role: UserRole; // Role bắt buộc, không còn tùy chọn undefined
}

// 🆕 Định nghĩa kiểu dữ liệu User trong ứng dụng
type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
};

// 📥 Hàm xử lý đăng nhập
export const login = async ({
  email,
  password,
}: LoginParams): Promise<LoginResponse> => {
  console.log(`🟢 Gọi API đăng nhập với email: ${email}`);
  try {
    const response: AxiosResponse<LoginResponse> = await axios.post(
      `${API_URL}/auth/login`,
      {
        email,
        password,
      }
    );

    console.log("✅ Phản hồi từ server:", response.data);

    // 🛠️ Lưu token vào localStorage nếu tồn tại
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
    }

    return response.data;
  } catch (error: any) {
    console.error(
      "❌ Lỗi khi gọi API đăng nhập:",
      error?.response?.data || error.message
    );

    // 🛠️ Hiển thị thông báo chi tiết khi đăng nhập thất bại
    if (error.response && error.response.data) {
      alert(`Lỗi đăng nhập: ${error.response.data.message}`);
    } else {
      alert("Đăng nhập thất bại, vui lòng kiểm tra lại thông tin.");
    }

    throw error;
  }
};

// 📥 Hàm xử lý đăng ký người dùng
export const register = async (
  email: string,
  password: string,
  role: UserRole = "user"
) => {
  console.log("🟢 Bắt đầu đăng ký với email:", email);
  try {
    const response = await axios.post(`${API_URL}/auth/register`, {
      email,
      password,
      role, // 🆕 Gửi role cùng với thông tin đăng ký
    });

    console.log("✅ Đăng ký thành công:", response.data);
    return response.data;
  } catch (error: any) {
    console.error(
      "❌ Lỗi khi đăng ký:",
      error?.response?.data || error.message
    );

    // 🛠️ Hiển thị thông báo chi tiết khi đăng ký thất bại
    if (error.response && error.response.data) {
      alert(`Lỗi đăng ký: ${error.response.data.message}`);
    } else {
      alert("Đăng ký thất bại, vui lòng kiểm tra lại thông tin.");
    }

    throw error;
  }
};

// 🆕 Hàm xử lý đăng xuất người dùng
export const logout = () => {
  console.log("🔴 Đăng xuất người dùng");
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "/auth/login"; // Chuyển hướng người dùng về trang đăng nhập
};

// 🆕 Tích hợp useAuth dưới dạng Hook React
export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // 🛠️ Lấy thông tin người dùng từ localStorage khi tải trang
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // 🆕 Đảm bảo login cập nhật đúng user vào state và localStorage
  const handleLogin = async ({
    email,
    password,
  }: LoginParams): Promise<LoginResponse> => {
    const response = await login({ email, password });
    if (response && response.token) {
      const userData: User = {
        id: "1", // Ví dụ tạm, có thể thay bằng response.id nếu có
        name: "John Doe", // Hoặc response.name
        email: email,
        role: response.role,
      };
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
    }
    return response;
  };

  return {
    user,
    login: handleLogin,
    register,
    logout,
  };
};
