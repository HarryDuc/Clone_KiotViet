import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionService } from './services/transaction.service';
import { TransactionSchema } from './schemas/transaction.schema';
import { TransactionController } from './controllers/transaction.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Transactions', schema: TransactionSchema }])
  ],
  controllers: [TransactionController],
  providers: [TransactionService],
  exports: [TransactionService]
})
export class TransactionModule { }