export type InteriorProject = {
    id: string;
    title: string;
    slug: string;
    area: string;
    customer: string;
    address: string;
    completedDate: string;
    description?: string;
    category: "CAFE_NHA_HANG" | "CAN_HO_BIET_THU" | "SHOP_SHOWROOM" | "VAN_PHONG";
    type: ("THIET_KE" | "THI_CONG")[];
    thumbnail: string;
    gallery: string[];
};

// ✅ DTO để tạo mới dự án (Không có `id`)
export type CreateInteriorProjectDto = Omit<InteriorProject, "id">;

// ✅ DTO để cập nhật dự án (Có thể cập nhật một phần dữ liệu)
export type UpdateInteriorProjectDto = Partial<InteriorProject>;
