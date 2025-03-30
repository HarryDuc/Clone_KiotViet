import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Branch } from './branch.schema';
import { Customer } from './customer.schema';
import { User } from './user.schema';

export type SocialMediaConversationDocument = SocialMediaConversation & Document;

@Schema({ timestamps: true })
export class SocialMediaConversation {
  @Prop({ required: true })
  conversationId: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Branch', required: true })
  branch: Branch;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Customer' })
  customer: Customer;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  assignedTo: User;

  @Prop({ required: true })
  channel: string;

  @Prop({ required: true })
  platform: string;

  @Prop({
    type: [{
      messageId: String,
      senderId: String,
      senderName: String,
      content: String,
      timestamp: Date,
      attachments: [String],
      isFromCustomer: Boolean
    }]
  })
  messages: Array<{
    messageId: string;
    senderId: string;
    senderName: string;
    content: string;
    timestamp: Date;
    attachments: string[];
    isFromCustomer: boolean;
  }>;

  @Prop({ default: 'open', enum: ['open', 'in_progress', 'resolved', 'closed'] })
  status: string;

  @Prop({ type: Object })
  metadata: {
    lastMessageAt: Date;
    unreadCount: number;
    priority: string;
    tags: string[];
  };

  @Prop()
  note: string;
}

export const SocialMediaConversationSchema = SchemaFactory.createForClass(SocialMediaConversation);