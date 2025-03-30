import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { SocialMediaPostService } from '../services/social-media-post.service';
import { SocialMediaPost } from '../schemas/social-media-post.schema';

@Controller('social-media-posts')
export class SocialMediaPostController {
  constructor(private readonly socialMediaPostService: SocialMediaPostService) { }

  @Post()
  create(@Body() createSocialMediaPostDto: any) {
    return this.socialMediaPostService.create(createSocialMediaPostDto);
  }

  @Get()
  findAll() {
    return this.socialMediaPostService.findAll();
  }

  @Get('store/:storeId')
  findByStore(@Param('storeId') storeId: string) {
    return this.socialMediaPostService.findByStore(storeId);
  }

  @Get('channel/:channelId')
  findByChannel(@Param('channelId') channelId: string) {
    return this.socialMediaPostService.findByChannel(channelId);
  }

  @Get('scheduled')
  findScheduledPosts() {
    return this.socialMediaPostService.findScheduledPosts();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.socialMediaPostService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSocialMediaPostDto: any) {
    return this.socialMediaPostService.update(id, updateSocialMediaPostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.socialMediaPostService.remove(id);
  }
}