import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Return, ReturnSchema } from '../schemas/return.schema';
import { ReturnController } from '../controllers/return.controller';
import { ReturnService } from '../services/return.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Return.name, schema: ReturnSchema }])
  ],
  controllers: [ReturnController],
  providers: [ReturnService],
  exports: [ReturnService]
})
export class ReturnModule { }
