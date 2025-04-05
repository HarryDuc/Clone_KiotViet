import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CashBook } from '../schemas/cash-book.schema';
import { CreateCashBookDTO, UpdateCashBookDTO } from '../dtos/cash-book.dto';

@Injectable()
export class CashBookService {
  constructor(
    @InjectModel('CashBooks') private cashBookModel: Model<CashBook>,
  ) { }

  async create(createCashBookDto: CreateCashBookDTO): Promise<CashBook> {
    const lastCashBook = await this.cashBookModel.findOne().sort({ cashBookId: -1 }).exec();
    let newCashBookId = 'CB00001';
  
    if (lastCashBook && lastCashBook.cashBookId) {
      const lastNumber = parseInt(lastCashBook.cashBookId.replace('CB', ''), 10);
      const nextNumber = lastNumber + 1;
      newCashBookId = `CB${nextNumber.toString().padStart(5, '0')}`;
    }
  
    const createdCashBook = new this.cashBookModel({
      ...createCashBookDto,
      cashBookId: newCashBookId
    });
  
    return createdCashBook.save();
  }

  async findAll(): Promise<CashBook[]> {
    return this.cashBookModel
      .find()
      .populate('branch')
      .populate('createdBy')
      .populate('account')
      .exec();
  }

  async findOne(id: string): Promise<CashBook> {
    const cashBook = await this.cashBookModel
      .findById(id)
      .populate('branch')
      .populate('createdBy')
      .populate('account')
      .exec();
    if (!cashBook) {
      throw new NotFoundException(`Cash book with ID ${id} not found`);
    }
    return cashBook;
  }

  async update(id: string, updateCashBookDto: UpdateCashBookDTO): Promise<CashBook> {
    const cashBook = await this.cashBookModel
      .findByIdAndUpdate(id, updateCashBookDto, { new: true })
      .populate('branch')
      .populate('createdBy')
      .populate('account')
      .exec();
    if (!cashBook) {
      throw new NotFoundException(`Cash book with ID ${id} not found`);
    }
    return cashBook;
  }

  async remove(id: string): Promise<CashBook> {
    const cashBook = await this.cashBookModel.findByIdAndDelete(id).exec();
    if (!cashBook) {
      throw new NotFoundException(`Cash book with ID ${id} not found`);
    }
    return cashBook;
  }
}