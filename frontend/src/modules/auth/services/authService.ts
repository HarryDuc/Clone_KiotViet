import axios, { AxiosResponse } from "axios";

// 🌐 Kiểm tra biến môi trường cho API URL và Khóa mã hóa AES
const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "";
// const ENCRYPTION_KEY = process.env.REACT_APP_ENCRYPTION_KEY ?? 'default_key'; // Khóa mã hóa

interface AuthResponse {
  message: string;
  token: string;
}

interface User {
  id: string;
  email: string;
  fullName?: string;
  avatar?: string;
}

/**
 * 📥 Gọi API đăng ký người dùng
 */
export const registerAPI = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  console.log(`🚀 Gọi API đăng ký: ${API_URL}/auth/register`);

  try {
    const response: AxiosResponse<AuthResponse> = await axios.post(
      `${API_URL}/auth/register`,
      { email, password }, // 🟢 Gửi mật khẩu dạng plaintext
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: false,
      }
    );

    console.log("✅ Đăng ký thành công:", response.data);
    return response.data;
  } catch (error: any) {
    handleAPIError(error, "đăng ký");
    throw error;
  }
};

export const checkEmailAPI = async (
  email: string
): Promise<{ isValid: boolean; googleId?: string }> => {
  try {
    console.log(
      `🚀 Gọi API kiểm tra email: ${API_URL}/auth/check-email?email=${email}`
    );

    const response: AxiosResponse<{ isValid: boolean; googleId?: string }> =
      await axios.get(`${API_URL}/auth/check-email`, { params: { email } });

    console.log("✅ Kết quả kiểm tra email:", response.data);

    return response.data;
  } catch (error: any) {
    console.error("❌ Lỗi từ API:", error?.response?.data || error.message);
    console.log("🔍 API_URL:", process.env.NEXT_PUBLIC_API_URL);

    // Nếu API trả về lỗi có response
    if (error.response) {
      const { data, status } = error.response;

      if (status === 400 && data?.message) {
        throw new Error(data.message);
      }
    }

    handleAPIError(error, "kiểm tra email");
    throw new Error("Lỗi không xác định khi kiểm tra email.");
  }
};

/**
 * 📥 Gọi API đăng nhập người dùng
 */
export const loginAPI = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  console.log(`🚀 Gọi API đăng nhập: ${API_URL}/auth/login`);

  try {
    const response: AxiosResponse<AuthResponse> = await axios.post(
      `${API_URL}/auth/login`,
      { email, password }, // 🟢 Gửi mật khẩu dạng plaintext
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: false,
      }
    );

    console.log("✅ Đăng nhập thành công:", response.data);
    return response.data;
  } catch (error: any) {
    handleAPIError(error, "đăng nhập");
    throw error;
  }
};

/**
 * 🔍 Lấy thông tin người dùng qua token
 */
export const fetchUserByToken = async (token: string): Promise<User> => {
  console.log(
    `🚀 Gọi API lấy thông tin người dùng qua token: ${API_URL}/auth/me`
  );

  try {
    const response: AxiosResponse<User> = await axios.get(
      `${API_URL}/auth/me`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("✅ Thông tin người dùng:", response.data);
    return response.data;
  } catch (error: any) {
    handleAPIError(error, "lấy thông tin người dùng");
    throw error;
  }
};

/**
 * 🚪 Gọi API đăng xuất người dùng
 */
export const logoutAPI = async () => {
  console.log(`🚪 Gọi API đăng xuất: ${API_URL}/auth/logout`);

  try {
    const response: AxiosResponse<{ message: string }> = await axios.post(
      `${API_URL}/auth/logout`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        withCredentials: false,
      }
    );

    console.log("✅ Đăng xuất thành công:", response.data);
    localStorage.removeItem("token");
    return response.data;
  } catch (error: any) {
    handleAPIError(error, "đăng xuất");
    throw error;
  }
};

/**
 * 🛠️ Xử lý lỗi API một cách chi tiết và có log
 */
const handleAPIError = (error: any, action: string) => {
  if (error.response) {
    console.error(`❌ Lỗi từ server khi ${action}:`, error.response.data);
    alert(
      `Lỗi từ server khi ${action}: ${
        error.response.data?.message || "Không xác định"
      }`
    );
  } else if (error.request) {
    console.error(`❌ Lỗi mạng hoặc CORS khi ${action}:`, error.message);
    alert(`Lỗi mạng hoặc CORS khi ${action}. Vui lòng kiểm tra kết nối mạng.`);
  } else {
    console.error(`❌ Lỗi không xác định khi ${action}:`, error.message);
    alert(`Lỗi không xác định khi ${action}. Vui lòng thử lại sau.`);
  }
};
