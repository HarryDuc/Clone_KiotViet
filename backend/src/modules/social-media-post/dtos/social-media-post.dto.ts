export class SocialMediaPostDTO {
  storeId: string;
  channelId: string;
  platform: string;
  postId: string;
  content: string;
  images: string[];
  products: { productId: string }[];
  postedBy: string;
  postDate: Date;
  status: string;
  createdAt: Date;
  scheduledDate: Date; // Thêm
  analytics: { views: number; likes: number; comments: number }; // Thêm
}

export class CreateSocialMediaPostDTO {
  storeId: string;
  channelId: string;
  platform: string;
  content: string;
  images: string[];
  products: { productId: string }[];
  postedBy: string;
  postDate: Date;
  status: string;
  scheduledDate?: Date; // Tùy chọn
}

export class UpdateSocialMediaPostDTO {
  content?: string;
  images?: string[];
  products?: { productId: string }[];
  postDate?: Date;
  status?: string;
  scheduledDate?: Date; // Tùy chọn
  analytics?: { views: number; likes: number; comments: number }; // Tùy chọn
}