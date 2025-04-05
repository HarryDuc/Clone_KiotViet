import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InventoryCheckSchema } from './schemas/inventory-check.schema';
import { InventoryCheckController } from './controllers/inventory-check.controller';
import { InventoryCheckService } from './services/inventory-check.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'InventoryChecks', schema: InventoryCheckSchema }])
  ],
  controllers: [InventoryCheckController],
  providers: [InventoryCheckService],
  exports: [InventoryCheckService]
})
export class InventoryCheckModule { }
