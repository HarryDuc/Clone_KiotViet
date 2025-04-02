import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CashBookController } from './controllers/cash-book.controller';
import { CashBookService } from '../supplier/services/cash-book.service';
import { CashBook, CashBookSchema } from './schemas/cash-book.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'CashBooks', schema: CashBookSchema }])
  ],
  controllers: [CashBookController],
  providers: [CashBookService],
  exports: [CashBookService]
})
export class CashBookModule { }