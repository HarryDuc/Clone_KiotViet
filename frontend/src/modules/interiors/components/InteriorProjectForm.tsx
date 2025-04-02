import React, { useState, useEffect } from "react";
import { CreateInteriorProjectDto, UpdateInteriorProjectDto } from "../types/interiors.types";
import ImageUploader from "@/common/components/ImageUploader";

type Props = {
    initialData?: CreateInteriorProjectDto | UpdateInteriorProjectDto;
    onSubmit: (data: CreateInteriorProjectDto | UpdateInteriorProjectDto) => void;
    isEdit?: boolean;
};

export const InteriorProjectForm: React.FC<Props> = ({ initialData, onSubmit, isEdit = false }) => {
    const [title, setTitle] = useState(initialData?.title || "");
    const [description, setDescription] = useState(initialData?.description || "");
    const [category, setCategory] = useState<"CAFE_NHA_HANG" | "CAN_HO_BIET_THU" | "SHOP_SHOWROOM" | "VAN_PHONG">(initialData?.category || "VAN_PHONG");
    const [type, setType] = useState<("THIET_KE" | "THI_CONG")[]>(initialData?.type || ["THIET_KE"]);
    const [area, setArea] = useState(initialData?.area || ""); // ✅ Bổ sung diện tích
    const [customer, setCustomer] = useState(initialData?.customer || ""); // ✅ Bổ sung khách hàng
    const [address, setAddress] = useState(initialData?.address || ""); // ✅ Bổ sung địa chỉ
    const [completedDate, setCompletedDate] = useState(initialData?.completedDate || ""); // ✅ Bổ sung ngày hoàn thành
    const [thumbnail, setThumbnail] = useState<string>(initialData?.thumbnail || "");
    const [gallery, setGallery] = useState<string[]>(initialData?.gallery || []);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        if (initialData?.gallery) {
            setGallery(initialData.gallery);
        }
    }, [initialData?.gallery]);

    // ✅ Xử lý upload hình ảnh
    const handleImageUpload = async (imageUrls: string[]) => {
        if (imageUrls.length > 0) {
            setThumbnail(imageUrls[0]); // Ảnh đầu tiên làm thumbnail
            setGallery(imageUrls); // Các ảnh còn lại làm gallery
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !thumbnail || !area || !customer || !address || !completedDate) {
            alert("❌ Vui lòng nhập đầy đủ thông tin!");
            return;
        }

        const projectData: CreateInteriorProjectDto | UpdateInteriorProjectDto = {
            title,
            description,
            category,
            type,
            area, // ✅ Lưu diện tích
            customer, // ✅ Lưu khách hàng
            address, // ✅ Lưu địa chỉ
            completedDate, // ✅ Lưu ngày hoàn thành
            thumbnail,
            gallery,
        };

        console.log("🚀 Gửi dữ liệu dự án:", projectData); // 🔍 Debug kiểm tra dữ liệu trước khi gửi
        onSubmit(projectData);
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
            <label className="block text-sm font-medium">Tên dự án:</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required className="w-full px-3 py-2 border rounded-md" />

            <label className="block text-sm font-medium mt-3">Mô tả:</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full px-3 py-2 border rounded-md" />

            <label className="block text-sm font-medium mt-3">Danh mục:</label>
            <select value={category} onChange={(e) => setCategory(e.target.value as any)} className="w-full px-3 py-2 border rounded-md">
                <option value="CAFE_NHA_HANG">Nội thất Cafe – Nhà hàng</option>
                <option value="CAN_HO_BIET_THU">Nội thất Căn hộ – Biệt thự</option>
                <option value="SHOP_SHOWROOM">Nội thất Shop – Showroom</option>
                <option value="VAN_PHONG">Nội thất Văn phòng</option>
            </select>

            {/* 📏 Nhập diện tích */}
            <label className="block text-sm font-medium mt-3">Diện tích (m²):</label>
            <input type="text" value={area} onChange={(e) => setArea(e.target.value)} required className="w-full px-3 py-2 border rounded-md" />

            {/* 👤 Nhập khách hàng */}
            <label className="block text-sm font-medium mt-3">Khách hàng:</label>
            <input type="text" value={customer} onChange={(e) => setCustomer(e.target.value)} required className="w-full px-3 py-2 border rounded-md" />

            {/* 📍 Nhập địa chỉ */}
            <label className="block text-sm font-medium mt-3">Địa chỉ:</label>
            <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required className="w-full px-3 py-2 border rounded-md" />

            {/* 📅 Ngày hoàn thành */}
            <label className="block text-sm font-medium mt-3">Ngày hoàn thành:</label>
            <input type="date" value={completedDate} onChange={(e) => setCompletedDate(e.target.value)} required className="w-full px-3 py-2 border rounded-md" />

            {/* 🏗️ Chọn loại dự án */}
            <div className="mt-3">
                <label className="block text-sm font-medium">Loại dự án:</label>
                <div className="flex gap-4">
                    <label>
                        <input type="checkbox" value="THIET_KE" checked={type.includes("THIET_KE")}
                            onChange={(e) => setType(e.target.checked ? [...type, "THIET_KE"] : type.filter((t) => t !== "THIET_KE"))} /> Thiết kế
                    </label>
                    <label>
                        <input type="checkbox" value="THI_CONG" checked={type.includes("THI_CONG")}
                            onChange={(e) => setType(e.target.checked ? [...type, "THI_CONG"] : type.filter((t) => t !== "THI_CONG"))} /> Thi công
                    </label>
                </div>
            </div>

            {/* 🖼️ Upload hình ảnh */}
            <label className="block text-sm font-medium mt-3">Upload Hình ảnh:</label>
            <ImageUploader onUploadSuccess={handleImageUpload} multiple={true} />

            {/* 📌 Nút gửi */}
            <button type="submit" className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition mt-4" disabled={uploading}>
                {uploading ? "Đang tải ảnh..." : isEdit ? "Cập nhật dự án" : "Tạo dự án"}
            </button>
        </form>
    );
};
