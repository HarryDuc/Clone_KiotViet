import React, { useState, useEffect } from "react";
import { CreatePostDto, UpdatePostDto } from "../types/postTypes";
import ImageUploader from "@/common/components/ImageUploader";

type Props = {
    initialData?: CreatePostDto | UpdatePostDto;
    onSubmit: (data: CreatePostDto | UpdatePostDto) => void; // ✅ Gửi object JSON thay vì FormData
    isEdit?: boolean;
};

export const PostForm: React.FC<Props> = ({ initialData, onSubmit, isEdit = false }) => {
    // 📝 State quản lý dữ liệu bài viết
    const [title, setTitle] = useState(initialData?.title || "");
    const [content, setContent] = useState(initialData?.content || "");
    const [author, setAuthor] = useState(initialData?.author || "author"); // ✅ Giá trị mặc định
    const [imageUrls, setImageUrls] = useState<string[]>(initialData?.thumbnail || []);

    // 🔄 Cập nhật khi có dữ liệu mới
    useEffect(() => {
        if (initialData?.thumbnail && Array.isArray(initialData.thumbnail)) {
            setImageUrls(initialData.thumbnail);
        }
    }, [initialData?.thumbnail]);

    // 📌 Xử lý gửi form
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // 🔴 Kiểm tra dữ liệu trước khi gửi
        if (!title || !content) {
            alert("❌ Tiêu đề và nội dung không được để trống!");
            return;
        }

        // ✅ Chuẩn bị dữ liệu để gửi
        const postData: CreatePostDto | UpdatePostDto = {
            title,
            content,
            author,
            thumbnail: imageUrls || [], // ✅ Đảm bảo thumbnail luôn là mảng
        };

        console.log("📦 Dữ liệu gửi đi:", postData);
        onSubmit(postData);
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
            {/* Nhập tiêu đề */}
            <div className="mb-4">
                <label className="block text-sm font-medium">Title:</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Nhập tiêu đề"
                    required
                    className="w-full px-3 py-2 border rounded-md"
                />
            </div>

            {/* Nhập nội dung */}
            <div className="mb-4">
                <label className="block text-sm font-medium">Content:</label>
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Nhập nội dung"
                    required
                    className="w-full px-3 py-2 border rounded-md"
                />
            </div>

            {/* Nhập tác giả */}
            <div className="mb-4">
                <label className="block text-sm font-medium">Author:</label>
                <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="Nhập tên tác giả"
                    required
                    className="w-full px-3 py-2 border rounded-md"
                />
            </div>

            {/* 📌 Upload hình ảnh */}
            <div className="mb-4">
                <label className="block text-sm font-medium">Upload Thumbnail:</label>
                <ImageUploader onUploadSuccess={(urls) => setImageUrls(urls)} multiple={true} />

                {/* 📌 Hiển thị ảnh xem trước */}
                {imageUrls.length > 0 && (
                    <div className="mt-2">
                        <p className="text-sm text-gray-600">Preview:</p>
                        <div className="flex gap-2">
                            {imageUrls.map((url, index) => (
                                <img key={index} src={url} alt={`Thumbnail ${index + 1}`} className="w-20 h-20 rounded-md shadow-md" />
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Nút Submit */}
            <button
                type="submit"
                className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
            >
                {isEdit ? "Cập nhật bài viết" : "Tạo bài viết"}
            </button>
        </form>
    );
};
