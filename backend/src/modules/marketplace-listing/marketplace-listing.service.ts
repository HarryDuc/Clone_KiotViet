import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MarketplaceListing } from '../marketplace-listing/marketplace-listing.schema';

@Injectable()
export class MarketplaceListingService {
  constructor(
    @InjectModel(MarketplaceListing.name)
    private marketplaceListingModel: Model<MarketplaceListing>,
  ) {}

  async create(createMarketplaceListingDto: any): Promise<MarketplaceListing> {
    const createdListing = new this.marketplaceListingModel(createMarketplaceListingDto);
    return createdListing.save();
  }

  async findAll(): Promise<MarketplaceListing[]> {
    return this.marketplaceListingModel.find().exec();
  }

  async findOne(id: string): Promise<MarketplaceListing> {
    const listing = await this.marketplaceListingModel.findById(id).exec();
    if (!listing) {
      throw new NotFoundException(`Marketplace listing with ID ${id} not found`);
    }
    return listing;
  }

  async update(id: string, updateMarketplaceListingDto: any): Promise<MarketplaceListing> {
    const updatedListing = await this.marketplaceListingModel
      .findByIdAndUpdate(id, updateMarketplaceListingDto, { new: true })
      .exec();
    if (!updatedListing) {
      throw new NotFoundException(`Marketplace listing with ID ${id} not found`);
    }
    return updatedListing;
  }

  async remove(id: string): Promise<MarketplaceListing> {
    const deletedListing = await this.marketplaceListingModel.findByIdAndDelete(id).exec();
    if (!deletedListing) {
      throw new NotFoundException(`Marketplace listing with ID ${id} not found`);
    }
    return deletedListing;
  }
}