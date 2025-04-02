// src/components/LogoutButton.tsx
import { useAuth } from "../../../context/AuthContext";

const LogoutButton = () => {
    const { logout } = useAuth();

    return (
        <button onClick={logout} className="btn-secondary">
            Đăng xuất
        </button>
    );
};

export default LogoutButton;
