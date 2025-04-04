import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MarketplaceListingService } from '../services/marketplace-listing.service';
import { MarketplaceListing } from './marketplace-listing.schema';

@Controller('marketplace-listings')
export class MarketplaceListingController {
  constructor(private readonly marketplaceListingService: MarketplaceListingService) { }

  @Post()
  create(@Body() createMarketplaceListingDto: any) {
    return this.marketplaceListingService.create(createMarketplaceListingDto);
  }

  @Get()
  findAll() {
    return this.marketplaceListingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.marketplaceListingService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMarketplaceListingDto: any) {
    return this.marketplaceListingService.update(id, updateMarketplaceListingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.marketplaceListingService.remove(id);
  }
}