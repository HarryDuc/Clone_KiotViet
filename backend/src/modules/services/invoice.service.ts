import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Invoice } from '../schemas/invoice.schema';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectModel('Invoices') private invoiceModel: Model<Invoice>,
  ) { }

  async create(createInvoiceDto: any): Promise<Invoice> {
    const createdInvoice = new this.invoiceModel(createInvoiceDto);
    return createdInvoice.save();
  }

  async findAll(): Promise<Invoice[]> {
    return this.invoiceModel
      .find()
      .populate('storeId')
      .populate('orderId')
      .populate('customerId')
      .populate('items.productId')
      .exec();
  }

  async findOne(id: string): Promise<Invoice> {
    const invoice = await this.invoiceModel
      .findById(id)
      .populate('storeId')
      .populate('orderId')
      .populate('customerId')
      .populate('items.productId')
      .exec();
    if (!invoice) {
      throw new NotFoundException(`Invoice with ID ${id} not found`);
    }
    return invoice;
  }

  async update(id: string, updateInvoiceDto: any): Promise<Invoice> {
    const invoice = await this.invoiceModel
      .findByIdAndUpdate(id, updateInvoiceDto, { new: true })
      .populate('storeId')
      .populate('orderId')
      .populate('customerId')
      .populate('items.productId')
      .exec();
    if (!invoice) {
      throw new NotFoundException(`Invoice with ID ${id} not found`);
    }
    return invoice;
  }

  async remove(id: string): Promise<Invoice> {
    const invoice = await this.invoiceModel.findByIdAndDelete(id).exec();
    if (!invoice) {
      throw new NotFoundException(`Invoice with ID ${id} not found`);
    }
    return invoice;
  }
}