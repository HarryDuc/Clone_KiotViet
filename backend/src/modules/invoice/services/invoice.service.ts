import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Invoice } from '../invoice/schemas/invoice.schema';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectModel('Invoices') private invoiceModel: Model<Invoice>,
  ) { }

  async create(createInvoiceDto: any): Promise<Invoice> {
    const lastInvoice = await this.invoiceModel.findOne().sort({ invoiceId: -1 }).exec();
    let newInvoiceId = 'HD0001';
  
    if (lastInvoice && lastInvoice.invoiceId) {
      const lastNumber = parseInt(lastInvoice.invoiceId.replace('HD', ''), 10);
      const nextNumber = lastNumber + 1;
      newInvoiceId = `HD${nextNumber.toString().padStart(4, '0')}`;
    }
  
    const createdInvoice = new this.invoiceModel({
      ...createInvoiceDto,
      invoiceId: newInvoiceId
    });
  
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