import React, { useState, useEffect } from "react";
import { CreateProductDto, UpdateProductDto } from "../types/product.type";

type Props = {
    initialData?: CreateProductDto | UpdateProductDto;
    onSubmit: (data: FormData) => void;
    isEdit?: boolean;
};

export const ProductForm: React.FC<Props> = ({ initialData, onSubmit, isEdit = false }) => {
    const [name, setName] = useState(initialData?.name || "");
    const [description, setDescription] = useState(initialData?.description || "");
    const [category, setCategory] = useState({
    });

    const [cost, setCost] = useState(initialData?.cost || 0);
    const [price, setPrice] = useState(initialData?.price || 0);

    // 🖼️ Image Uploads
    const [thumbnail, setThumbnail] = useState<File | null>(null);
    const [gallery, setGallery] = useState<File[]>([]);
    const [uploading, setUploading] = useState(false);

    // 🔄 Previews for Selected Images
    const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
    const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);

    useEffect(() => {
        if (thumbnail) {
            const previewUrl = URL.createObjectURL(thumbnail);
            setThumbnailPreview(previewUrl);
            return () => URL.revokeObjectURL(previewUrl);
        }
    }, [thumbnail]);

    useEffect(() => {
        const previews = gallery.map((file) => URL.createObjectURL(file));
        setGalleryPreviews(previews);
        return () => previews.forEach((url) => URL.revokeObjectURL(url));
    }, [gallery]);

    // ✅ Handle Thumbnail Selection
    const handleThumbnailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setThumbnail(event.target.files[0]);
        }
    };

    // ✅ Handle Gallery Selection
    const handleGalleryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setGallery(Array.from(event.target.files));
        }
    };

    // ✅ Handle Form Submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !thumbnail || cost <= 0 || price <= 0) {
            alert("❌ Vui lòng nhập đầy đủ thông tin sản phẩm!");
            return;
        }

        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("cost", cost.toString());
        formData.append("price", price.toString());

        // 🖼️ Append Image Files
        if (thumbnail) formData.append("thumbnail", thumbnail);
        gallery.forEach((file) => formData.append("gallery", file));

        console.log("🚀 Gửi dữ liệu sản phẩm:", formData);
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
            <label className="block text-sm font-medium">Tên sản phẩm:</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="w-full px-3 py-2 border rounded-md" />

            <label className="block text-sm font-medium mt-3">Mô tả sản phẩm:</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full px-3 py-2 border rounded-md"></textarea>

            <label className="block text-sm font-medium mt-3">Giá vốn (VNĐ):</label>
            <input type="number" value={cost} onChange={(e) => setPrice(Number(e.target.value))} required className="w-full px-3 py-2 border rounded-md" />

            <label className="block text-sm font-medium mt-3">Giá bán (VNĐ):</label>
            <input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} required className="w-full px-3 py-2 border rounded-md" />

            {/* 🖼️ Upload hình ảnh */}
            <label className="block text-sm font-medium mt-3">Ảnh đại diện:</label>
            <input type="file" onChange={handleThumbnailChange} accept="image/*" required />
            {thumbnailPreview && <img src={thumbnailPreview} alt="Ảnh đại diện" className="mt-2 w-32 h-32 object-cover border rounded-md" />}

            <label className="block text-sm font-medium mt-3">Album ảnh:</label>
            <input type="file" multiple onChange={handleGalleryChange} accept="image/*" />
            {galleryPreviews.length > 0 && (
                <div className="mt-2 grid grid-cols-3 gap-2">
                    {galleryPreviews.map((url, index) => (
                        <img key={index} src={url} alt={`Hình ${index + 1}`} className="w-20 h-20 object-cover border rounded-md" />
                    ))}
                </div>
            )}

            {/* 📌 Nút gửi */}
            <button type="submit" className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition mt-4" disabled={uploading}>
                {uploading ? "Đang tải ảnh..." : isEdit ? "Cập nhật sản phẩm" : "Tạo sản phẩm"}
            </button>
        </form>
    );
};
