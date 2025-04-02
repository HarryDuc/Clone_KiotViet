"use client";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { checkEmailAPI } from "../services/authService";
import validator from "validator";
import { Form, Button, Container, Card } from "react-bootstrap";
import Link from "next/link";
import "../style/auth.css";
import { useRouter } from "next/navigation";

const RegisterForm = () => {
  const { register, loading, error } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validationError, setValidationError] = useState("");
  const [emailError, setEmailError] = useState("");

  // Kiểm tra định dạng email
  const isValidEmailFormat = (email: string): boolean => {
    // Kiểm tra có @ không
    const atIndex = email.indexOf("@");
    if (atIndex === -1) return false;

    // Lấy phần sau @
    const domainPart = email.slice(atIndex + 1);

    // Kiểm tra có ít nhất một dấu . sau @ không
    return domainPart.includes(".");
  };

  // Kiểm tra email với API
  const checkEmail = async (email: string) => {
    try {
      const { isValid } = await checkEmailAPI(email);
      if (!isValid) {
        setEmailError("Email đã được sử dụng.");
      } else {
        setEmailError("");
      }
    } catch (error: any) {
      setEmailError("Lỗi kiểm tra email. Vui lòng thử lại.");
      console.error("Lỗi kiểm tra email:", error);
    }
  };

  // Xử lý khi email thay đổi
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setEmailError("");
  };

  // Xử lý khi người dùng rời khỏi input email
  const handleEmailBlur = () => {
    if (!email) return;

    if (!isValidEmailFormat(email)) {
      setEmailError("Email không hợp lệ");
      return;
    }

    // Nếu email hợp lệ, kiểm tra với API
    checkEmail(email);
  };

  const validateForm = (): boolean => {
    // Kiểm tra email rỗng
    if (!email) {
      setValidationError("Vui lòng nhập email.");
      return false;
    }

    // Kiểm tra định dạng email
    if (!isValidEmailFormat(email)) {
      setValidationError("Email không hợp lệ");
      return false;
    }

    // Kiểm tra nếu có lỗi email từ API
    if (emailError) {
      setValidationError(emailError);
      return false;
    }

    // Kiểm tra độ dài mật khẩu
    if (!validator.isLength(password, { min: 6 })) {
      setValidationError("Mật khẩu phải có ít nhất 6 ký tự.");
      return false;
    }

    // Kiểm tra mật khẩu xác nhận
    if (!validator.equals(password, confirmPassword)) {
      setValidationError("Mật khẩu xác nhận không khớp.");
      return false;
    }

    setValidationError("");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      const result = await register(email, password);
      if (result) {
        // Lưu email vào localStorage
        localStorage.setItem("verificationEmail", email);
        // Đảm bảo chuyển hướng đúng đến trang xác thực
        router.push(
          {
            pathname: "/auth/verify-email",
            // Thêm replace: true để tránh quay lại trang đăng ký
          },
          undefined,
          { shallow: false, replace: true }
        );
      }
    } catch (error) {
      console.error("Registration error:", error);
    }
  };
  const backendURL: string = process.env.NEXT_PUBLIC_API_URL || "";

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Card className="border-0 shadow" style={{ width: "600px" }}>
        <Card.Body>
          <div className="text-center">
            <h2 className="auth-title">Đăng ký tài khoản</h2>
            <p className="auth-subtitle">
              Tiếp tục với Google hoặc nhập thông tin của bạn
            </p>
          </div>

          {/* Google Register Button */}
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
            <span>Đăng ký với Google</span>
          </Button>

          <div className="divider text-center my-3">
            <span>hoặc</span>
          </div>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>
                Email <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="email"
                placeholder="Nhập email của bạn"
                value={email}
                onChange={handleEmailChange}
                onBlur={handleEmailBlur}
                className={emailError ? "is-invalid" : ""}
                required
              />
              {emailError && (
                <div className="invalid-feedback">{emailError}</div>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>
                Mật khẩu <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="Nhập mật khẩu của bạn"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>
                Xác nhận mật khẩu <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="Xác nhận mật khẩu của bạn"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </Form.Group>

            {validationError && (
              <p className="text-danger text-center">{validationError}</p>
            )}

            <Button
              variant="success"
              type="submit"
              className="w-100 py-2 mb-3"
              disabled={loading || !!emailError}>
              {loading ? "Đang đăng ký..." : "Đăng ký"}
            </Button>
          </Form>

          <p className="text-center mb-0">
            Đã có tài khoản?{" "}
            <Link href="/auth/login" className="text-decoration-underline">
              Đăng nhập ngay
            </Link>
          </p>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default RegisterForm;
