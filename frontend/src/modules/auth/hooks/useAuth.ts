// 📁 src/modules/auth/hooks/useAuth.ts
import { useState } from "react";
import { loginAPI, registerAPI } from "../services/authService";

// 🆕 Khai báo type chuẩn cho LoginResponse
interface LoginResponse {
  message: string;
  token: string;
  user?: any; // Nếu response có trả về thông tin user (có thể cập nhật đúng type nếu có)
}

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      console.log("Bắt đầu đăng nhập với email:", email);
      const res: LoginResponse = await loginAPI(email, password);
      console.log("Đăng nhập thành công:", res);

      // 🆕 Kiểm tra và gán user nếu có
      if (res.user) {
        setUser(res.user);
      }

      // 🆕 Lưu token vào localStorage hoặc context
      if (res.token) {
        localStorage.setItem("token", res.token);
        console.log("✅ Token đã được lưu vào localStorage");
      }
    } catch (err: any) {
      console.error("Lỗi đăng nhập:", err);
      setError(err.response?.data?.message || "Đã có lỗi xảy ra!");
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      console.log("Bắt đầu đăng ký với email:", email);
      await registerAPI(email, password);
      console.log("Đăng ký thành công");
    } catch (err: any) {
      console.error("Lỗi đăng ký:", err);
      setError(err.response?.data?.message || "Đã có lỗi xảy ra!");
    } finally {
      setLoading(false);
    }
  };

  return { user, login, register, loading, error };
};
