import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReturnSchema } from './schemas/return.schema';
import { ReturnController } from './controllers/return.controller';
import { ReturnService } from './services/return.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Returns', schema: ReturnSchema }])
  ],
  controllers: [ReturnController],
  providers: [ReturnService],
  exports: [ReturnService]
})
export class ReturnModule { }
