// 📁 src/modules/auth/components/LoginForm.tsx
"use client";
import { useState } from "react";
import { login } from "@/modules/auth/repositories/authRepository";
import { useAuth } from "@/context/AuthContext";
import { Form, Button, Container, Card } from "react-bootstrap";
import Link from "next/link";
import "../style/auth.css";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const { login: authLogin } = useAuth();

  /**
   * ✅ Xử lý sự kiện submit form đăng nhập
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("🟢 Bắt đầu đăng nhập với email:", email);

    try {
      const response = await login({ email, password });
      console.log("✅ Đăng nhập thành công:", response);

      // 🛠️ Kiểm tra role của người dùng, nếu không có thì gán mặc định là "user"
      const userRole = response.role || "user";
      console.log(`🛠️ Role của người dùng: ${userRole}`);

      // Lưu token và role vào state thông qua AuthContext
      authLogin(response.token, userRole);
    } catch (error: any) {
      console.error("❌ Lỗi đăng nhập:", error);

      // Hiển thị thông báo chi tiết khi đăng nhập thất bại
      if (error.response && error.response.data) {
        alert(error.response.data.message);
      } else {
        alert("Đăng nhập thất bại, vui lòng kiểm tra lại thông tin.");
      }
    }
  };

  const backendURL: string = process.env.NEXT_PUBLIC_API_URL || "";

  /**
   * ✅ Giao diện form đăng nhập
   */
  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Card className="border-0 shadow" style={{ width: "600px" }}>
        <Card.Body>
          <div className="text-center">
            <h2 className="auth-title">Chào mừng trở lại, Katsun Decor</h2>
            <p className="auth-subtitle">
              Tiếp tục với Google hoặc nhập thông tin của bạn
            </p>
          </div>

          {/* Google Login Button */}
          <Button
            variant="outline-dark"
            className="google-btn w-100 mb-3 d-flex align-items-center justify-content-center gap-2 py-2 text-black"
            onClick={() =>
              (window.location.href = `${backendURL}/auth/google`)
            }>
            <svg
              width="18"
              height="18"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48">
              <path
                fill="#FFC107"
                d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
              />
              <path
                fill="#FF3D00"
                d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
              />
              <path
                fill="#4CAF50"
                d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
              />
              <path
                fill="#1976D2"
                d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
              />
            </svg>
            <span>Đăng nhập với Google</span>
          </Button>

          <div className="divider">
            <span>hoặc</span>
          </div>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">
                Email <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="email"
                placeholder="Nhập email của bạn"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">
                Password <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="Nhập mật khẩu của bạn"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <div className="d-flex justify-content-between align-items-center mb-4">
              <Form.Check
                type="checkbox"
                label="Ghi nhớ tôi"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <Link
                href="/forgot-password"
                className="text-decoration-underline fs-6">
                Quên mật khẩu?
              </Link>
            </div>

            <Button variant="success" type="submit" className="w-100 py-2 mb-3">
              Đăng nhập
            </Button>

            <p className="text-center mb-0">
              Bạn chưa có tài khoản?{" "}
              <Link href="/auth/register" className="text-decoration-underline">
                Đăng ký ngay
              </Link>
            </p>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default LoginForm;
