import { Controller, Get, Post, Body, Put, Param, Delete, Query } from '@nestjs/common';
import { SocialMediaConversation } from '../schemas/social-media-conversation.schema';
import { SocialMediaConversationService } from '../services/social-media-conversation.service';
import { CreateSocialMediaConversationDTO, UpdateSocialMediaConversationDTO } from '../dtos/social-media-conversation.dto';
@Controller('social-media-conversations')
export class SocialMediaConversationController {
  constructor(private readonly conversationService: SocialMediaConversationService) { }

  @Post()
  async create(@Body() createConversationDto: CreateSocialMediaConversationDTO): Promise<SocialMediaConversation> {
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
    @Body() updateConversationDto: UpdateSocialMediaConversationDTO,
  ): Promise<SocialMediaConversation> {
    return this.conversationService.update(id, updateConversationDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<SocialMediaConversation> {
    return this.conversationService.remove(id);
  }

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

}