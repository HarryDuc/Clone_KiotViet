import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ collection: 'SocialMediaConversations' })
export class SocialMediaConversation extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Stores', required: true })
  storeId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'SalesChannels', required: true })
  channelId: Types.ObjectId;

  @Prop({ required: true })
  platform: string;

  @Prop({ required: true })
  conversationId: string;

  @Prop({ required: true })
  customerName: string;

  @Prop({ type: [{ sender: String, message: String, timestamp: Date }] })
  messages: { sender: string; message: string; timestamp: Date }[];

  @Prop({ enum: ['open', 'closed', 'pending'], default: 'open' })
  status: string;

  @Prop({ type: Types.ObjectId, ref: 'Employees' })
  assignedTo: Types.ObjectId;

  @Prop({ type: [{ orderId: Types.ObjectId }] })
  relatedOrders: { orderId: Types.ObjectId }[];

  @Prop({ type: [{ productId: Types.ObjectId }] })
  relatedProducts: { productId: Types.ObjectId }[];

  @Prop({ default: Date.now })
  createdAt: Date;

  // Trường mới
  @Prop()
  notes: string;

  @Prop({ type: Types.ObjectId, ref: 'Customers' })
  customerId: Types.ObjectId;
}

export const SocialMediaConversationSchema = SchemaFactory.createForClass(SocialMediaConversation);