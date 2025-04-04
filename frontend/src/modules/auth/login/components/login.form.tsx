import React, { useState } from "react";
import { CreateUserDto, UpdateUserDto } from "../types/user.type";

type Props = {
    initialData?: CreateUserDto | UpdateUserDto;
    onSubmit: (data: FormData) => void;
};

export const LoginForm: React.FC<Props> = ({ onSubmit }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [uploading, setUploading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if ( !email || !password) {
            alert("❌ Vui lòng nhập đầy đủ thông tin người dùng!");
            return;
        }

        const formData = new FormData();
        formData.append("email", email);
        formData.append("password", password);

        console.log("🚀 Gửi dữ liệu người dùng:", formData);
        onSubmit(formData);
    };
    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
            <label className="block text-sm font-medium">Email:</label>
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-3 py-2 border rounded-md" />

            <label className="block text-sm font-medium mt-3">Mat khau:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-3 py-2 border rounded-md"></input>

            {/* 📌 Nút gửi */}
            <button type="submit" className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition mt-4" disabled={uploading}>
                {uploading ? "Dang dang nhap..." : "Dang nhap"}
            </button>
        </form>
    );
};
