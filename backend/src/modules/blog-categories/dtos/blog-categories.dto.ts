export class BlogCategoriesDTO {
  storeId: string;
  name: string;
  slug: string;
  description: string;
  parentCategories: string;
  order: number;
  status: string;
  seo: { metaTitle: string; metaDescription: string };
  name_en: string; // Thêm
  description_en: string; // Thêm
}

export class CreateBlogCategoriesDTO {
  storeId: string;
  name: string;
  slug: string;
  description: string;
  parentCategories: string;
  order: number;
  status: string;
  seo: { metaTitle: string; metaDescription: string };
  name_en?: string; // Tùy chọn
  description_en?: string; // Tùy chọn
}

export class UpdateBlogCategoriesDTO {
  name?: string;
  slug?: string;
  description?: string;
  parentCategories?: string;
  order?: number;
  status?: string;
  seo?: { metaTitle?: string; metaDescription?: string };
  name_en?: string; // Tùy chọn
  description_en?: string; // Tùy chọn
}