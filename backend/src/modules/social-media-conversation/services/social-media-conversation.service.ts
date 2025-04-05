import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SocialMediaConversation } from '../schemas/social-media-conversation.schema';
import { CreateSocialMediaConversationDTO, UpdateSocialMediaConversationDTO } from '../dtos/social-media-conversation.dto';
@Injectable()
export class SocialMediaConversationService {
  constructor(
    @InjectModel('SocialMediaConversations') private conversationModel: Model<SocialMediaConversation>,
  ) { }

  async create(createConversationDto: CreateSocialMediaConversationDTO): Promise<SocialMediaConversation> {
    const createdConversation = new this.conversationModel(createConversationDto);
    return createdConversation.save();
  }

  async findAll(): Promise<SocialMediaConversation[]> {
    return this.conversationModel
      .find()
      .populate('branch')
      .populate('customer')
      .populate('assignedTo')
      .populate('channel')
      .exec();
  }

  async findOne(id: string): Promise<SocialMediaConversation> {
    const conversation = await this.conversationModel
      .findById(id)
      .populate('branch')
      .populate('customer')
      .populate('assignedTo')
      .populate('channel')
      .exec();
    if (!conversation) {
      throw new NotFoundException(`Social media conversation with ID ${id} not found`);
    }
    return conversation;
  }

  async update(id: string, updateConversationDto: UpdateSocialMediaConversationDTO): Promise<SocialMediaConversation> {
    const conversation = await this.conversationModel
      .findByIdAndUpdate(id, updateConversationDto, { new: true })
      .populate('branch')
      .populate('customer')
      .populate('assignedTo')
      .populate('channel')
      .exec();
    if (!conversation) {
      throw new NotFoundException(`Social media conversation with ID ${id} not found`);
    }
    return conversation;
  }

  async remove(id: string): Promise<SocialMediaConversation> {
    const conversation = await this.conversationModel.findByIdAndDelete(id).exec();
    if (!conversation) {
      throw new NotFoundException(`Social media conversation with ID ${id} not found`);
    }
    return conversation;
  }
}