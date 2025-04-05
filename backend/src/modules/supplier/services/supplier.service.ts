import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Supplier } from '../schemas/supplier.schema';
import { CreateSupplierDTO, UpdateSupplierDTO } from '../dto/supplier.dto';
@Injectable()
export class SupplierService {
  constructor(
    @InjectModel('Suppliers') private supplierModel: Model<Supplier>,
  ) { }

  async create(createSupplierDto: CreateSupplierDTO): Promise<Supplier> {
    const lastSupplier = await this.supplierModel.findOne().sort({ supplierId: -1 }).exec();
    let newSupplierId = 'SPR00001';
  
    if (lastSupplier && lastSupplier.supplierId) {
      const lastNumber = parseInt(lastSupplier.supplierId.replace('SPR', ''), 10);
      const nextNumber = lastNumber + 1;
      newSupplierId = `SPR${nextNumber.toString().padStart(5, '0')}`;
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

  async update(id: string, updateSupplierDto: UpdateSupplierDTO): Promise<Supplier> {
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