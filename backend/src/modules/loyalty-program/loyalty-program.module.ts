import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LoyaltyProgramSchema } from './schemas/loyalty-program.schema';
import { LoyaltyProgramController } from './controllers/loyalty-program.controller';
import { LoyaltyProgramService } from './services/loyalty-program.service';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'LoyaltyPrograms', schema: LoyaltyProgramSchema }])
  ],
  controllers: [LoyaltyProgramController],
  providers: [LoyaltyProgramService],
  exports: [LoyaltyProgramService]
})
export class LoyaltyProgramModule { }
