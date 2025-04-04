export class BlogPostDTO {
  storeId: string;
  title: string;
  slug: string;
  category: string;
  thumbnail: string;
  content: string;
  excerpt: string;
  author: string;
  tags: string[];
  status: string;
  publishedAt: Date;
  views: number; // Thêm
  likes: number; // Thêm
  comments: { user: string; content: string; createdAt: Date }[]; // Thêm
  seo: { metaTitle: string; metaDescription: string; ogImage: string };
  title_en?: string;
}

export class CreateBlogPostDTO {
  storeId: string;
  title: string;
  slug: string;
  category: string;
  thumbnail: string;
  content: string;
  excerpt: string;
  author: string;
  tags: string[];
  status: string;
  publishedAt: Date;
  seo: { metaTitle: string; metaDescription: string; ogImage: string };
  title_en?: string;
}

export class UpdateBlogPostDTO {
  title?: string;
  slug?: string;
  category?: string;
  thumbnail?: string;
  content?: string;
  excerpt?: string;
  author?: string;
  tags?: string[];
  status?: string;
  publishedAt?: Date;
  seo?: { metaTitle?: string; metaDescription?: string; ogImage?: string };
  title_en?: string;
}