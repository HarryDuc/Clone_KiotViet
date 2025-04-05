import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { WebsiteSettingsService } from '../services/website-settings.service';
import { WebsiteSettings } from '../schemas/website-settings.schema';
import { CreateWebsiteSettingsDTO, UpdateWebsiteSettingsDTO } from '../dtos/website-setting.dto';
@Controller('website-settings')
export class WebsiteSettingsController {
  constructor(private readonly websiteSettingsService: WebsiteSettingsService) { }

  @Post()
  async create(@Body() createWebsiteSettingsDto: CreateWebsiteSettingsDTO): Promise<WebsiteSettings> {
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
    @Body() updateWebsiteSettingsDto: UpdateWebsiteSettingsDTO,
  ): Promise<WebsiteSettings> {
    return this.websiteSettingsService.update(id, updateWebsiteSettingsDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<WebsiteSettings> {
    return this.websiteSettingsService.remove(id);
  }

  @Put(':id/seo')
  async updateSEO(
    @Param('id') id: string,
    @Body() seo: any,
  ): Promise<WebsiteSettings> {
    return this.websiteSettingsService.update(id, { seo });
  }
}
