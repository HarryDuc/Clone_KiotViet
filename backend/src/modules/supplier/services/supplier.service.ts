import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Supplier } from '../schemas/supplier.schema';
import { Product } from '../../product/schemas/product.schema';

@Injectable()
export class SupplierService {
  constructor(
    @InjectModel('Suppliers') private supplierModel: Model<Supplier>,
  ) { }

  async create(createSupplierDto: any): Promise<Supplier> {
    const lastSupplier = await this.supplierModel.findOne().sort({ supplierId: -1 }).exec();
    let newSupplierId = 'SSE0001';
  
    if (lastSupplier && lastSupplier.supplierId) {
      const lastNumber = parseInt(lastSupplier.supplierId.replace('SSE', ''), 10);
      const nextNumber = lastNumber + 1;
      newSupplierId = `SSE${nextNumber.toString().padStart(4, '0')}`;
    }
  
    const createdSupplier = new this.supplierModel({
      ...createSupplierDto,
      supplierId: newSupplierId
    });
  
    return createdSupplier.save();
  }
  async findAll(): Promise<Supplier[]> {
    return this.supplierModel.find().populate('group').exec();
  }

  async findOne(id: string): Promise<Supplier> {
    const supplier = await this.supplierModel.findById(id).populate('group').exec();
    if (!supplier) {
      throw new NotFoundException(`Supplier with ID ${id} not found`);
    }
    return supplier;
  }

  async update(id: string, updateSupplierDto: any): Promise<Supplier> {
    const supplier = await this.supplierModel
      .findByIdAndUpdate(id, updateSupplierDto, { new: true })
      .populate('group')
      .exec();
    if (!supplier) {
      throw new NotFoundException(`Supplier with ID ${id} not found`);
    }
    return supplier;
  }

  async remove(id: string): Promise<Supplier> {
    const supplier = await this.supplierModel.findByIdAndDelete(id).exec();
    if (!supplier) {
      throw new NotFoundException(`Supplier with ID ${id} not found`);
    }
    return supplier;
  }
}