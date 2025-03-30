import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MarketingCampaign, MarketingCampaignDocument } from '../schemas/marketing-campaign.schema';

@Injectable()
export class MarketingCampaignService {
  constructor(
    @InjectModel(MarketingCampaign.name) private marketingCampaignModel: Model<MarketingCampaignDocument>,
  ) { }

  async create(createMarketingCampaignDto: any): Promise<MarketingCampaign> {
    const createdCampaign = new this.marketingCampaignModel(createMarketingCampaignDto);
    return createdCampaign.save();
  }

  async findAll(): Promise<MarketingCampaign[]> {
    return this.marketingCampaignModel
      .find()
      .populate('branch')
      .populate('createdBy')
      .populate('targetCustomers')
      .populate('products')
      .exec();
  }

  async findOne(id: string): Promise<MarketingCampaign> {
    const campaign = await this.marketingCampaignModel
      .findById(id)
      .populate('branch')
      .populate('createdBy')
      .populate('targetCustomers')
      .populate('products')
      .exec();
    if (!campaign) {
      throw new NotFoundException(`Marketing campaign with ID ${id} not found`);
    }
    return campaign;
  }

  async update(id: string, updateMarketingCampaignDto: any): Promise<MarketingCampaign> {
    const campaign = await this.marketingCampaignModel
      .findByIdAndUpdate(id, updateMarketingCampaignDto, { new: true })
      .populate('branch')
      .populate('createdBy')
      .populate('targetCustomers')
      .populate('products')
      .exec();
    if (!campaign) {
      throw new NotFoundException(`Marketing campaign with ID ${id} not found`);
    }
    return campaign;
  }

  async remove(id: string): Promise<MarketingCampaign> {
    const campaign = await this.marketingCampaignModel.findByIdAndDelete(id).exec();
    if (!campaign) {
      throw new NotFoundException(`Marketing campaign with ID ${id} not found`);
    }
    return campaign;
  }
}