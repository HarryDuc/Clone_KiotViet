import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MarketplaceListingController } from './controllers/marketplace-listing.controller';
import { MarketplaceListingService } from './services/marketplace-listing.service';
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