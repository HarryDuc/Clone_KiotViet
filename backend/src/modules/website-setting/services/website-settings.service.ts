import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { WebsiteSettings } from '../schemas/website-settings.schema';
import { CreateWebsiteSettingsDTO, UpdateWebsiteSettingsDTO } from '../dtos/website-setting.dto';
@Injectable()
export class WebsiteSettingsService {
  constructor(
    @InjectModel('WebsiteSettings')
    private websiteSettingsModel: Model<WebsiteSettings>,
  ) { }

  async create(createWebsiteSettingsDto: CreateWebsiteSettingsDTO): Promise<WebsiteSettings> {
    const created = new this.websiteSettingsModel(createWebsiteSettingsDto);
    return created.save();
  }

  async findAll(): Promise<WebsiteSettings[]> {
    return this.websiteSettingsModel.find().exec();
  }

  async findOne(id: string): Promise<WebsiteSettings> {
    const settings = await this.websiteSettingsModel.findById(id).exec();
    if (!settings) {
      throw new NotFoundException(`Website settings with ID ${id} not found`);
    }
    return settings;
  }

  async findByStore(storeId: string): Promise<WebsiteSettings> {
    const settings = await this.websiteSettingsModel.findOne({ storeId }).exec();
    if (!settings) {
      throw new NotFoundException(`Website settings for store ${storeId} not found`);
    }
    return settings;
  }

  async update(id: string, updateWebsiteSettingsDto: UpdateWebsiteSettingsDTO): Promise<WebsiteSettings> {
    const settings = await this.websiteSettingsModel
      .findByIdAndUpdate(id, updateWebsiteSettingsDto, { new: true })
      .exec();
    if (!settings) {
      throw new NotFoundException(`Website settings with ID ${id} not found`);
    }
    return settings;
  }

  async remove(id: string): Promise<WebsiteSettings> {
    const settings = await this.websiteSettingsModel.findByIdAndDelete(id).exec();
    if (!settings) {
      throw new NotFoundException(`Website settings with ID ${id} not found`);
    }
    return settings;
  }
}