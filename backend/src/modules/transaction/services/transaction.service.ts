import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTransactionDTO, UpdateTransactionDTO } from '../dtos/transaction.dto';
import { Transaction } from '../schemas/transaction.schema';
@Injectable()
export class TransactionService {
  constructor(
    @InjectModel('Transactions') private TransactionModel: Model<Transaction>,
  ) { }

  async create(createTransactionDto: CreateTransactionDTO): Promise<Transaction> {
    const lastTransaction = await this.TransactionModel.findOne().sort({ transactionId: -1 }).exec();
    let newTransactionId = 'TRX00001';
  
    if (lastTransaction && lastTransaction.transactionId) {
      const lastNumber = parseInt(lastTransaction.transactionId.replace('TRX', ''), 10);
      const nextNumber = lastNumber + 1;
      newTransactionId = `TRX${nextNumber.toString().padStart(5, '0')}`;
    }
  
    const createdTransaction = new this.TransactionModel({
      ...createTransactionDto,
      transactionId: newTransactionId
    });
  
    return createdTransaction.save();
  }

  async findAll(): Promise<Transaction[]> {
    return this.TransactionModel.find().exec();
  }

  async findOne(id: string): Promise<Transaction> {
    const transaction = await this.TransactionModel.findById(id).exec();
    if (!transaction) {
        throw new NotFoundException(`Transaction with ID ${id} not found`);
    }
    return transaction;
  }

  async update(id: string, updateTransactionDto: UpdateTransactionDTO): Promise<Transaction> {
    const transaction = await this.TransactionModel
      .findByIdAndUpdate(id, updateTransactionDto, { new: true })
      .exec();
    if (!transaction) {
      throw new NotFoundException(`Transaction with ID ${id} not found`);
    }
    return transaction;
  }

  async remove(id: string): Promise<Transaction> {
    const transaction = await this.TransactionModel.findByIdAndDelete(id).exec();
    if (!transaction) {
      throw new NotFoundException(`Transaction with ID ${id} not found`);
    }
    return transaction;
  }
}