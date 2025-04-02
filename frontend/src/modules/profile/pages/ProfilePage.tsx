// 📁 src/modules/profile/pages/ProfilePage.tsx
import { useAuth } from "@/context/AuthContext";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
    updateUserProfile,
    getUserProfile,
    UserProfile,
} from "@/modules/profile/repositories/profileRepository";

const ProfilePage = () => {
    const { user, isAuthenticated, verifyToken, logout, token } = useAuth();
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState<UserProfile>({
        id: "",
        fullName: "",
        email: "",
        phoneNumber: "",
        avatarUrl: "",
        role: "user",
        status: "active",
    });

    const router = useRouter();

    useEffect(() => {
        console.log("🔍 ProfilePage - Kiểm tra quyền truy cập...");
        verifyToken();

        if (!isAuthenticated) {
            console.warn("⚠️ Chưa xác thực, chuyển hướng tới trang đăng nhập...");
            router.push("/auth/login");
            return;
        }

        if (token) {
            console.log("👤 Tải thông tin hồ sơ người dùng...");
            getUserProfile(token)
                .then((userProfile) => {
                    console.log("✅ Hồ sơ người dùng:", userProfile);
                    setProfile(userProfile);
                    setFormData({
                        id: userProfile.id,
                        fullName: userProfile.fullName || "",
                        email: userProfile.email,
                        phoneNumber: userProfile.phoneNumber || "",
                        avatarUrl: userProfile.avatarUrl || "",
                        role: userProfile.role,
                        status: userProfile.status,
                    });
                })
                .catch((error) => {
                    console.error("❌ Lỗi khi tải hồ sơ người dùng:", error);
                });
        }
    }, [isAuthenticated, token, verifyToken]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("✏️ Cập nhật thông tin người dùng...", formData);

        try {
            if (!token) throw new Error("Không tìm thấy token xác thực!");

            const updatedProfile = await updateUserProfile(token, formData);
            console.log("✅ Cập nhật thông tin thành công:", updatedProfile);
            setProfile(updatedProfile);
            setIsEditing(false);
        } catch (error) {
            console.error("❌ Lỗi khi cập nhật thông tin:", error);
            alert("Lỗi khi cập nhật thông tin, vui lòng thử lại.");
        }
    };

    const handleLogout = () => {
        console.log("🚪 Đăng xuất...");
        logout();
    };

    if (!isAuthenticated) {
        return <p>Đang kiểm tra quyền truy cập...</p>;
    }

    return (
        <div className="p-6 bg-white shadow-lg rounded-lg w-full max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Thông Tin Hồ Sơ</h2>

            {profile ? (
                <>
                    {!isEditing ? (
                        <div className="mb-4">
                            <p><strong>Họ tên:</strong> {profile.fullName}</p>
                            <p><strong>Email:</strong> {profile.email}</p>
                            <p><strong>Số điện thoại:</strong> {profile.phoneNumber}</p>
                            {profile.avatarUrl && (
                                <img
                                    src={profile.avatarUrl}
                                    alt="Avatar"
                                    className="w-24 h-24 rounded-full"
                                />
                            )}
                            <button
                                onClick={() => setIsEditing(true)}
                                className="btn-primary mt-4"
                            >
                                Chỉnh sửa thông tin
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input
                                type="text"
                                name="fullName"
                                placeholder="Họ tên"
                                value={formData.fullName}
                                onChange={handleInputChange}
                                className="input"
                                required
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="input"
                                required
                            />
                            <input
                                type="text"
                                name="phoneNumber"
                                placeholder="Số điện thoại"
                                value={formData.phoneNumber}
                                onChange={handleInputChange}
                                className="input"
                            />
                            <input
                                type="text"
                                name="avatarUrl"
                                placeholder="URL Avatar"
                                value={formData.avatarUrl}
                                onChange={handleInputChange}
                                className="input"
                            />
                            <div className="flex space-x-4">
                                <button type="submit" className="btn-primary">
                                    Lưu thay đổi
                                </button>
                                <button
                                    type="button"
                                    className="btn-secondary"
                                    onClick={() => setIsEditing(false)}
                                >
                                    Hủy
                                </button>
                            </div>
                        </form>
                    )}
                    <button onClick={handleLogout} className="btn-danger mt-4 w-full">
                        Đăng xuất
                    </button>
                </>
            ) : (
                <p>Đang tải thông tin người dùng...</p>
            )}
        </div>
    );
};

export default ProfilePage;
