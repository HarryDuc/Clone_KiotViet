import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Carrier } from '../schemas/carrier.schema';

@Injectable()
export class CarrierService {
  constructor(
    @InjectModel(Carrier.name) private CarrierModel: Model<Carrier>,
  ) { }
  async create(createCarrierDto: any): Promise<Carrier> {
    const createdAttendance = new this.CarrierModel(createCarrierDto);
    return createdAttendance.save();
  }
}