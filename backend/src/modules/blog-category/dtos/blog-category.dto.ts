export class BlogCategoryDTO {
  storeId: string;
  name: string;
  slug: string;
  description: string;
  parentCategory: string;
  order: number;
  status: string;
  seo: { metaTitle: string; metaDescription: string };
  name_en: string; // Thêm
  description_en: string; // Thêm
}

export class CreateBlogCategoryDTO {
  storeId: string;
  name: string;
  slug: string;
  description: string;
  parentCategory: string;
  order: number;
  status: string;
  seo: { metaTitle: string; metaDescription: string };
  name_en?: string; // Tùy chọn
  description_en?: string; // Tùy chọn
}

export class UpdateBlogCategoryDTO {
  name?: string;
  slug?: string;
  description?: string;
  parentCategory?: string;
  order?: number;
  status?: string;
  seo?: { metaTitle?: string; metaDescription?: string };
  name_en?: string; // Tùy chọn
  description_en?: string; // Tùy chọn
}