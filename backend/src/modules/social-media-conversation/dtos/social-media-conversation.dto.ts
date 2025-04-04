export class SocialMediaConversationDTO {
  storeId: string;
  channelId: string;
  platform: string;
  conversationId: string;
  customerName: string;
  messages: { sender: string; message: string; timestamp: Date }[];
  status: string;
  assignedTo: string;
  relatedOrders: { orderId: string }[];
  relatedProducts: { productId: string }[];
  createdAt: Date;
  notes: string; // Thêm
  customerId: string; // Thêm
}

export class CreateSocialMediaConversationDTO {
  storeId: string;
  channelId: string;
  platform: string;
  conversationId: string;
  customerName: string;
  messages: { sender: string; message: string; timestamp: Date }[];
  status: string;
  assignedTo: string;
  relatedOrders: { orderId: string }[];
  relatedProducts: { productId: string }[];
  notes?: string; // Tùy chọn
  customerId?: string; // Tùy chọn
}

export class UpdateSocialMediaConversationDTO {
  messages?: { sender: string; message: string; timestamp: Date }[];
  status?: string;
  assignedTo?: string;
  relatedOrders?: { orderId: string }[];
  relatedProducts?: { productId: string }[];
  notes?: string; // Tùy chọn
  customerId?: string; // Tùy chọn
}