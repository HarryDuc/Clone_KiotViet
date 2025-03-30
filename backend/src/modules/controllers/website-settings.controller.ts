import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { WebsiteSettingsService } from '../services/website-settings.service';
import { WebsiteSettings } from '../schemas/website-settings.schema';

@Controller('website-settings')
export class WebsiteSettingsController {
  constructor(private readonly websiteSettingsService: WebsiteSettingsService) { }

  @Post()
  async create(@Body() createWebsiteSettingsDto: any): Promise<WebsiteSettings> {
    return this.websiteSettingsService.create(createWebsiteSettingsDto);
  }

  @Get()
  async findAll(): Promise<WebsiteSettings[]> {
    return this.websiteSettingsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<WebsiteSettings> {
    return this.websiteSettingsService.findOne(id);
  }

  @Get('store/:storeId')
  async findByStore(@Param('storeId') storeId: string): Promise<WebsiteSettings> {
    return this.websiteSettingsService.findByStore(storeId);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateWebsiteSettingsDto: any,
  ): Promise<WebsiteSettings> {
    return this.websiteSettingsService.update(id, updateWebsiteSettingsDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<WebsiteSettings> {
    return this.websiteSettingsService.remove(id);
  }

  @Put(':id/maintenance')
  async toggleMaintenance(
    @Param('id') id: string,
    @Body() data: { isEnabled: boolean; message?: string },
  ): Promise<WebsiteSettings> {
    return this.websiteSettingsService.update(id, {
      'maintenance.isEnabled': data.isEnabled,
      'maintenance.message': data.message,
    });
  }

  @Put(':id/theme')
  async updateTheme(
    @Param('id') id: string,
    @Body() theme: any,
  ): Promise<WebsiteSettings> {
    return this.websiteSettingsService.update(id, { theme });
  }

  @Put(':id/seo')
  async updateSEO(
    @Param('id') id: string,
    @Body() seo: any,
  ): Promise<WebsiteSettings> {
    return this.websiteSettingsService.update(id, { seo });
  }

  @Put(':id/contact')
  async updateContact(
    @Param('id') id: string,
    @Body() contact: any,
  ): Promise<WebsiteSettings> {
    return this.websiteSettingsService.update(id, { contact });
  }

  @Put(':id/social-media')
  async updateSocialMedia(
    @Param('id') id: string,
    @Body() socialMedia: any,
  ): Promise<WebsiteSettings> {
    return this.websiteSettingsService.update(id, { socialMedia });
  }
}
