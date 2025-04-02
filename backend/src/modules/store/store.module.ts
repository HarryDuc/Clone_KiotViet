import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StoreController } from './controllers/store.controller';
import { StoreService } from './services/store.service';
import { Store, StoreSchema } from './schemas/store.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Stores', schema: StoreSchema },
    ]),
  ],
  controllers: [StoreController],
  providers: [StoreService],
  exports: [StoreService],
})
export class StoreModule { }
