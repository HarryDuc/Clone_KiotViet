import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Position, PositionSchema } from './schemas/position.schema';
import { PositionService } from './services/position.service';
import { PositionController } from  './controllers/position.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Positions', schema: PositionSchema }])
  ],
  controllers: [PositionController],
  providers: [PositionService],
  exports: [PositionService]
})
export class PositionModule { }
