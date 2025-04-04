import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MarketplaceListingController } from './marketplace-listing.controller';
import { MarketplaceListingService } from './marketplace-listing.service';
import { MarketplaceListing, MarketplaceListingSchema } from './schemas/marketplace-listing.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MarketplaceListing.name, schema: MarketplaceListingSchema }
    ])
  ],
  controllers: [MarketplaceListingController],
  providers: [MarketplaceListingService],
  exports: [MarketplaceListingService]
})
export class MarketplaceListingModule { }