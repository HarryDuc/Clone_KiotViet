import React, { useState } from "react";
import { CreateProductDto, UpdateProductDto } from "../types/product.type";

type Props = {
    initialData?: CreateProductDto | UpdateProductDto;
    onSubmit: (data: FormData) => void;
    isEdit?: boolean;
};

export const ProductForm: React.FC<Props> = ({ initialData, onSubmit, isEdit = false }) => {
    const [name, setName] = useState(initialData?.name || "");
    const [description, setDescription] = useState(initialData?.description || "");
    const [location, setLocation] = useState(initialData?.location || "");
    const [minStock, setMinStock] = useState(initialData?.minStock || 0);
    const [maxStock, setMaxStock] = useState(initialData?.maxStock || 0);
    const [stock, setStock] = useState(initialData?.stock || 0);
    const [weight, setWeight] = useState(initialData?.weight || 0);
    const [unit, setUnit] = useState(initialData?.unit || "");

    const [cost, setCost] = useState(initialData?.cost || 0);
    const [price, setPrice] = useState(initialData?.price || 0);

    const [uploading, setUploading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || cost <= 0 || price <= 0) {
            alert("❌ Vui lòng nhập đầy đủ thông tin sản phẩm!");
            return;
        }

        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("cost", cost.toString());
        formData.append("price", price.toString());

        console.log("🚀 Gửi dữ liệu sản phẩm:", formData);
        onSubmit(formData);
    };
    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
            <label className="block text-sm font-medium">Tên sản phẩm:</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="w-full px-3 py-2 border rounded-md" />

            <label className="block text-sm font-medium mt-3">Mô tả sản phẩm:</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full px-3 py-2 border rounded-md"></textarea>

            <label className="block text-sm font-medium mt-3">Min stock:</label>
            <input type="number" value={minStock} onChange={(e) => setMinStock(Number(e.target.value))} required className="w-full px-3 py-2 border rounded-md" />

            <label className="block text-sm font-medium mt-3">Max stock:</label>
            <input type="number" value={maxStock} onChange={(e) => setMaxStock(Number(e.target.value))} required className="w-full px-3 py-2 border rounded-md" />


            <label className="block text-sm font-medium">Vị trí sản phẩm:</label>
            <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required className="w-full px-3 py-2 border rounded-md" />

            <label className="block text-sm font-medium mt-3">Số lượng tồn kho:</label>
            <input type="number" value={stock} onChange={(e) => setStock(Number(e.target.value))} required className="w-full px-3 py-2 border rounded-md" />

            <label className="block text-sm font-medium mt-3">Trọng lượng sản phẩm:</label>
            <input type="number" value={weight} onChange={(e) => setWeight(Number(e.target.value))} required className="w-full px-3 py-2 border rounded-md" />

            <label className="block text-sm font-medium mt-3">Đơn vị tính:</label>
            <input type="text" value={unit} onChange={(e) => setUnit(e.target.value)} required className="w-full px-3 py-2 border rounded-md" />

            <label className="block text-sm font-medium mt-3">Giá vốn (VNĐ):</label>
            <input type="number" value={cost} onChange={(e) => setCost(Number(e.target.value))} required className="w-full px-3 py-2 border rounded-md" />

            <label className="block text-sm font-medium mt-3">Giá bán (VNĐ):</label>
            <input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} required className="w-full px-3 py-2 border rounded-md" />

            {/* 📌 Nút gửi */}
            <button type="submit" className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition mt-4" disabled={uploading}>
                {uploading ? "Đang tải ảnh..." : isEdit ? "Cập nhật sản phẩm" : "Tạo sản phẩm"}
            </button>
        </form>
    );
};
