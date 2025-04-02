import axios from "axios";
import {
    InteriorProject,
    CreateInteriorProjectDto,
    UpdateInteriorProjectDto
} from "../types/interiors.types";


// 🌐 Load biến môi trường từ `.env`
const API_URL = process.env.NEXT_PUBLIC_API_URL + "/interior";
const IMG_BB_API_KEY = process.env.NEXT_PUBLIC_IMG_BB_API_KEY || "be2171867ff7acbda2a0ce0d2dde34e3";
const IMG_BB_UPLOAD_URL = process.env.NEXT_PUBLIC_IMG_BB_UPLOAD_URL || "https://api.imgbb.com/1/upload";



/**
 * 🖼️ Upload nhiều ảnh lên ImgBB (tải đồng thời để tối ưu hiệu suất)
 * @param files Danh sách file ảnh cần upload
 * @returns Danh sách URL ảnh đã tải lên
 */
export const uploadImagesToImgBB = async (files: File[]): Promise<string[]> => {
    if (!files || files.length === 0) {
        console.warn("⚠️ Không có ảnh nào để tải lên.");
        return [];
    }

    // 🔄 Dùng `Promise.all` để tải ảnh đồng thời
    const uploadPromises = files.map(async (file) => {
        if (!file.type.startsWith("image/")) {
            console.warn(`❌ File không hợp lệ: ${file.name}`);
            return null;
        }

        const formData = new FormData();
        formData.append("image", file);

        try {
            const response = await axios.post(`${IMG_BB_UPLOAD_URL}?key=${IMG_BB_API_KEY}`, formData);
            if (response.data.success) {
                console.log(`✅ Ảnh ${file.name} đã tải lên: ${response.data.data.url}`);
                return response.data.data.url;
            } else {
                console.error(`❌ Lỗi tải ảnh ${file.name}:`, response.data.error.message);
                return null;
            }
        } catch (error) {
            console.error(`❌ Lỗi tải ảnh ${file.name}:`, error);
            return null;
        }
    });

    // ✅ Lọc bỏ các giá trị `null`
    const uploadedUrls = (await Promise.all(uploadPromises)).filter((url): url is string => url !== null);

    if (uploadedUrls.length === 0) {
        throw new Error("❌ Không thể tải lên bất kỳ ảnh nào!");
    }

    return uploadedUrls;
};

export const InteriorsService = {
    /**
     * 📌 Lấy danh sách tất cả dự án nội thất
     */
    async getAll(): Promise<InteriorProject[]> {
        try {
            const response = await axios.get(API_URL);
            return response.data;
        } catch (error) {
            console.error("❌ Lỗi khi lấy danh sách dự án:", error);
            throw error;
        }
    },

    /**
     * 📌 Lấy thông tin dự án theo ID
     */
    async getById(id: string): Promise<InteriorProject> {
        try {
            const response = await axios.get(`${API_URL}/id/${id}`);
            return response.data;
        } catch (error) {
            console.error(`❌ Lỗi khi lấy dự án ID ${id}:`, error);
            throw error;
        }
    },

    /**
     * 📌 Lấy thông tin dự án theo `slug`
     */
    async getBySlug(slug: string): Promise<InteriorProject> {
        try {
            const response = await axios.get(`${API_URL}/${slug}`);
            return response.data;
        } catch (error) {
            console.error(`❌ Lỗi khi lấy dự án Slug ${slug}:`, error);
            throw error;
        }
    },

    /**
     * 📌 Tạo mới dự án nội thất
     * ✅ Chỉ gửi URL ảnh lên backend
     */
    async create(data: CreateInteriorProjectDto, files: File[]): Promise<InteriorProject> {
        try {
            const imageUrls = await uploadImagesToImgBB(files);

            const projectData = {
                ...data,
                thumbnail: imageUrls[0] || "", // Ảnh đầu tiên làm thumbnail
                gallery: imageUrls.slice(1), // Các ảnh còn lại làm gallery
            };

            const response = await axios.post(`${API_URL}/create`, projectData);
            console.log("✅ Dự án đã được tạo:", response.data);
            return response.data;
        } catch (error) {
            console.error("❌ Lỗi khi tạo dự án:", error);
            throw error;
        }
    },

    /**
     * 📌 Cập nhật dự án nội thất theo ID
     * ✅ Nếu có ảnh mới, chỉ thêm ảnh mới, không xóa ảnh cũ
     * ✅ Nếu có danh sách `removedImages`, xóa ảnh được chọn
     */
    async update(id: string, data: UpdateInteriorProjectDto, files?: File[], removedImages?: string[]): Promise<InteriorProject> {
        try {
            let updatedData = { ...data };

            if (files && files.length > 0) {
                const imageUrls = await uploadImagesToImgBB(files);
                updatedData = {
                    ...data,
                    ...(imageUrls[0] && { thumbnail: imageUrls[0] }),
                    ...(imageUrls.length > 1 && {
                        gallery: [...(data.gallery || []), ...imageUrls.slice(1)], // ✅ Giữ ảnh cũ
                    }),
                };
            }

            // ✅ Nếu có danh sách hình ảnh bị xóa, loại bỏ chúng khỏi `gallery`
            if (removedImages && removedImages.length > 0) {
                updatedData.gallery = updatedData.gallery?.filter(img => !removedImages.includes(img)) || [];
            }

            const response = await axios.put(`${API_URL}/${id}`, updatedData);
            console.log(`✅ Dự án ID ${id} đã được cập nhật.`);
            return response.data;
        } catch (error) {
            console.error(`❌ Lỗi khi cập nhật dự án ID ${id}:`, error);
            throw error;
        }
    },

    /**
     * 📌 Xóa dự án nội thất theo ID
     */
    async delete(id: string): Promise<void> {
        try {
            await axios.delete(`${API_URL}/${id}`);
            console.log(`✅ Dự án ID ${id} đã được xóa.`);
        } catch (error) {
            console.error(`❌ Lỗi khi xóa dự án ID ${id}:`, error);
            throw error;
        }
    },
};
