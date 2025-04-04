// LiveStreamDTO: Đại diện toàn bộ schema
export class LiveStreamDTO {
  storeId: string; // Mã cửa hàng
  channelId: string; // Mã kênh
  title: string; // Tiêu đề
  description: string; // Mô tả
  thumbnail: string; // Ảnh đại diện
  scheduledStartTime: Date; // Thời gian bắt đầu dự kiến
  actualStartTime: Date; // Thời gian bắt đầu thực tế
  endTime: Date; // Thời gian kết thúc
  duration: number; // Thời lượng
  status: string; // Trạng thái
  products: { productId: string; name: string; price: number; discount: number; stock: number; order: number }[]; // Sản phẩm
  promotions: { type: string; value: number; description: string; startTime: Date; endTime: Date }[]; // Khuyến mãi
  engagement: {
    viewers: number;
    likes: number;
    comments: number;
    shares: number;
    peakViewers: number;
  }; // Tương tác
  sales: {
    orders: number;
    totalRevenue: number;
    averageOrderValue: number;
  }; // Doanh số
  comments: { userId: string; userName: string; content: string; timestamp: Date; isPinned: boolean }[]; // Bình luận
  recording: {
    url: string;
    duration: number;
    size: number;
    format: string;
  }; // Bản ghi
  analytics: {
    viewerRetention: number;
    engagementRate: number;
    conversionRate: number;
    topProducts: { productId: string; sales: number; revenue: number }[];
  }; // Phân tích
}

// CreateLiveStreamDTO: Dùng để tạo mới
export class CreateLiveStreamDTO {
  storeId: string; // Mã cửa hàng
  channelId: string; // Mã kênh
  title: string; // Tiêu đề
  description: string; // Mô tả
  thumbnail: string; // Ảnh đại diện
  scheduledStartTime: Date; // Thời gian bắt đầu dự kiến
  status: string; // Trạng thái
  products: { productId: string; name: string; price: number; discount: number; stock: number; order: number }[]; // Sản phẩm
  promotions: { type: string; value: number; description: string; startTime: Date; endTime: Date }[]; // Khuyến mãi
}

// UpdateLiveStreamDTO: Dùng để cập nhật
export class UpdateLiveStreamDTO {
  title?: string; // Tiêu đề
  description?: string; // Mô tả
  thumbnail?: string; // Ảnh đại diện
  scheduledStartTime?: Date; // Thời gian bắt đầu dự kiến
  actualStartTime?: Date; // Thời gian bắt đầu thực tế
  endTime?: Date; // Thời gian kết thúc
  duration?: number; // Thời lượng
  status?: string; // Trạng thái
  products?: { productId: string; name: string; price: number; discount: number; stock: number; order: number }[]; // Sản phẩm
  promotions?: { type: string; value: number; description: string; startTime: Date; endTime: Date }[]; // Khuyến mãi
  engagement?: {
    viewers?: number;
    likes?: number;
    comments?: number;
    shares?: number;
    peakViewers?: number;
  }; // Tương tác
  sales?: {
    orders?: number;
    totalRevenue?: number;
    averageOrderValue?: number;
  }; // Doanh số
  comments?: { userId: string; userName: string; content: string; timestamp: Date; isPinned: boolean }[]; // Bình luận
  recording?: {
    url?: string;
    duration?: number;
    size?: number;
    format?: string;
  }; // Bản ghi
  analytics?: {
    viewerRetention?: number;
    engagementRate?: number;
    conversionRate?: number;
    topProducts?: { productId: string; sales: number; revenue: number }[];
  }; // Phân tích
}