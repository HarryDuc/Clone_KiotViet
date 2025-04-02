// 📁 src/modules/auth/components/VerifyEmailForm.tsx

import { useState, useEffect, ChangeEvent } from "react";
import { Form, Button, Container, Card } from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/router";
import "../style/auth.css";
import { verifyEmailAPI, resendVerificationAPI } from "../services/authService";
import type { AxiosError } from "axios";

function formatTime(seconds: number): string {
  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;
  return `${min}:${sec < 10 ? "0" : ""}${sec}`;
}

const VerifyEmailForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [timeLeft, setTimeLeft] = useState(300);

  // Khi component mount, lấy timer từ localStorage và nếu không hợp lệ (0 hoặc không tồn tại) thì khởi tạo lại 300
  useEffect(() => {
    const storedTime = localStorage.getItem("verificationTimeLeft");
    if (storedTime && parseInt(storedTime, 10) > 0) {
      setTimeLeft(parseInt(storedTime, 10));
    } else {
      setTimeLeft(300);
      localStorage.setItem("verificationTimeLeft", "300");
    }
  }, []);

  // Lấy email từ localStorage khi component mount
  useEffect(() => {
    const storedEmail = localStorage.getItem("verificationEmail");
    if (storedEmail) {
      setEmail(storedEmail);
    } else {
      router.push("/auth/register");
    }
  }, [router]);

  // Thiết lập timer: chạy một lần khi component mount
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          localStorage.setItem("verificationTimeLeft", "0");
          return 0;
        }
        const newTime = prev - 1;
        localStorage.setItem("verificationTimeLeft", newTime.toString());
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Xử lý khi người dùng gõ vào ô nhập mã
  const handleChangeCode = (e: ChangeEvent<HTMLInputElement>) => {
    let raw = e.target.value;
    // Chỉ giữ chữ số (bỏ mọi ký tự khác)
    raw = raw.replace(/\D/g, "");
    // Giới hạn 6 ký tự
    if (raw.length > 6) {
      raw = raw.slice(0, 6);
    }
    setVerificationCode(raw);
  };

  const handleResendCode = async () => {
    try {
      setLoading(true);
      await resendVerificationAPI(email);
      setTimeLeft(300);
      localStorage.setItem("verificationTimeLeft", "300");
      setError("");
    } catch (err: unknown) {
      const error = err as AxiosError<{ message: string }>;
      setError(
        error.response?.data?.message ||
          "Không thể gửi lại mã. Vui lòng thử lại sau."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      console.log("🟢 Bắt đầu xác thực email với mã:", verificationCode);
      const response = await verifyEmailAPI(email, verificationCode);

      if (response.success) {
        console.log("✅ Xác thực email thành công");
        localStorage.removeItem("verificationEmail");
        localStorage.removeItem("verificationTimeLeft");
        router.push("/auth/login?verified=true");
      }
    } catch (err: unknown) {
      console.error("❌ Lỗi xác thực email:", err);
      setVerificationCode(""); // Clear the input
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Mã xác thực không chính xác, vui lòng thử lại.");
      }
    } finally {
      setLoading(false);
    }
  };
  // Update the form error display
  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Card className="border-0 shadow" style={{ width: "550px" }}>
        <Card.Body>
          <div className="text-center">
            <h2 className="auth-title">Xác thực Email</h2>
            <p className="auth-subtitle">
              Vui lòng nhập mã xác thực đã được gửi đến email:
              <br />
              <strong>{email}</strong>
            </p>
          </div>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-4">
              <Form.Label className="fw-semibold mb-3">
                Mã xác thực <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="_ _ _ _ _ _"
                value={verificationCode}
                onChange={handleChangeCode}
                maxLength={6}
                required
                className={`text-center fs-4 ${error ? "border-danger" : ""}`}
                style={{
                  borderRadius: "10px",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  letterSpacing: "1rem",
                }}
              />
              <div className="d-flex flex-column gap-2">
                {error && (
                  <div
                    className="text-danger mt-2"
                    style={{ fontSize: "0.875rem" }}
                  >
                    <i className="fas fa-exclamation-circle me-1"></i> {error}
                  </div>
                )}
                <div className="d-flex justify-content-between align-items-center mt-2">
                  <Form.Text
                    className={timeLeft > 0 ? "text-muted" : "text-danger"}
                    style={{ fontWeight: 500 }}
                  >
                    ⏱️ Thời gian còn lại: {formatTime(timeLeft)}
                  </Form.Text>
                  <Button
                    variant="link"
                    className="text-decoration-none text-primary"
                    onClick={handleResendCode}
                    disabled={timeLeft > 0 || loading}
                    style={{ fontWeight: 500 }}
                  >
                    {timeLeft > 0 ? "⌛ Đợi để gửi lại mã" : "🔄 Gửi lại mã"}
                  </Button>
                </div>
              </div>
            </Form.Group>

            <Button
              variant="success"
              type="submit"
              className="w-100 py-2 mb-3 fw-bold"
              disabled={loading || verificationCode.length !== 6}
              style={{
                borderRadius: "10px",
                fontSize: "1.1rem",
              }}
            >
              {loading ? "⏳ Đang xử lý..." : "✅ Xác thực"}
            </Button>
            <hr className="my-4" />
            <p className="text-center mb-0">
              <Link href="/auth/login" className="text-decoration-underline">
                Quay lại đăng nhập
              </Link>
            </p>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default VerifyEmailForm;
