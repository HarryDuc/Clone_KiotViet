import { Controller, Get, Post, Body, Put, Param, Delete, Query } from '@nestjs/common';
import { SocialMediaConversationService } from './social-media-conversation.service';
import { SocialMediaConversation } from './social-media-conversation.schema';

@Controller('social-media-conversations')
export class SocialMediaConversationController {
  constructor(private readonly conversationService: SocialMediaConversationService) { }

  @Post()
  async create(@Body() createConversationDto: any): Promise<SocialMediaConversation> {
    return this.conversationService.create(createConversationDto);
  }

  @Get()
  async findAll(
    @Query('branchId') branchId?: string,
    @Query('status') status?: string,
    @Query('platform') platform?: string,
    @Query('assignedTo') assignedTo?: string,
  ): Promise<SocialMediaConversation[]> {
    // TODO: Implement filtering logic in service
    return this.conversationService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<SocialMediaConversation> {
    return this.conversationService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateConversationDto: any,
  ): Promise<SocialMediaConversation> {
    return this.conversationService.update(id, updateConversationDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<SocialMediaConversation> {
    return this.conversationService.remove(id);
  }

  // @Post(':id/messages')
  // async addMessage(
  //   @Param('id') id: string,
  //   @Body() message: any,
  // ): Promise<SocialMediaConversation> {
  //   const conversation = await this.conversationService.findOne(id);
  //   conversation.messages.push(message);
  //   conversation.metadata.lastMessageAt = new Date();
  //   conversation.metadata.unreadCount += 1;
  //   return this.conversationService.update(id, conversation);
  // }

  @Put(':id/assign')
  async assignTo(
    @Param('id') id: string,
    @Body('userId') userId: string,
  ): Promise<SocialMediaConversation> {
    return this.conversationService.update(id, { assignedTo: userId });
  }

  @Put(':id/status')
  async updateStatus(
    @Param('id') id: string,
    @Body('status') status: string,
  ): Promise<SocialMediaConversation> {
    return this.conversationService.update(id, { status });
  }

  @Put(':id/read')
  async markAsRead(@Param('id') id: string): Promise<SocialMediaConversation> {
    return this.conversationService.update(id, { 'metadata.unreadCount': 0 });
  }
}