import React, { useState } from "react";
import { RegisterUserDto } from "../types/user.type";

type Props = {
    initialData?: RegisterUserDto;
    onSubmit: (data: FormData) => void;
};

export const RegisterForm: React.FC<Props> = ({ onSubmit}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [fullName, setFullName] = useState("");
    const [role, setRole] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    const [uploading, setUploading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!password || !fullName || !role || !email || !phone) {
            alert("❌ Vui lòng nhập đầy đủ thông tin người dùng!");
            return;
        }

        const formData = new FormData();
        formData.append("username", username);
        formData.append("password", password);
        formData.append("fullName", fullName);
        formData.append("role", role);
        formData.append("email", email);
        formData.append("phone", phone);

        console.log("🚀 Gửi dữ liệu sản phẩm:", formData);
        onSubmit(formData);
    };
    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
            <label className="block text-sm font-medium">Username:</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required className="w-full px-3 py-2 border rounded-md" />

            <label className="block text-sm font-medium mt-3">Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-3 py-2 border rounded-md"></input>

            <label className="block text-sm font-medium mt-3">Full name:</label>
            <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} required className="w-full px-3 py-2 border rounded-md" />

            <label className="block text-sm font-medium mt-3">Role:</label>
            <input type="text" value={role} onChange={(e) => setRole(e.target.value)} required className="w-full px-3 py-2 border rounded-md" />


            <label className="block text-sm font-medium mt-3">Email:</label>
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-3 py-2 border rounded-md" />

            <label className="block text-sm font-medium mt-3">Phone:</label>
            <input type="number" value={phone} onChange={(e) => setPhone(e.target.value)} required className="w-full px-3 py-2 border rounded-md" />

            {/* 📌 Nút gửi */}
            <button type="submit" className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition mt-4" disabled={uploading}>
                {uploading ? "Dang dang ky..." : "Dang ky"}
            </button>
        </form>
    );
};
