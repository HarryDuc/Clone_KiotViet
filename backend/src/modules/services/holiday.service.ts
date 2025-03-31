import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Holiday } from '../schemas/holiday.schema';

@Injectable()
export class HolidayService {
  constructor(
    @InjectModel(Holiday.name)
    private holidayModel: Model<Holiday>,
  ) { }

  async create(createHolidayDto: any): Promise<Holiday> {
    const created = new this.holidayModel(createHolidayDto);
    return created.save();
  }

  async findAll(query: any = {}): Promise<Holiday[]> {
    return this.holidayModel.find(query).exec();
  }

  async findOne(id: string): Promise<Holiday> {
    const holiday = await this.holidayModel.findById(id).exec();
    if (!holiday) {
      throw new NotFoundException(`Holiday with ID ${id} not found`);
    }
    return holiday;
  }

  async update(id: string, updateHolidayDto: any): Promise<Holiday> {
    const holiday = await this.holidayModel
      .findByIdAndUpdate(id, updateHolidayDto, { new: true })
      .exec();
    if (!holiday) {
      throw new NotFoundException(`Holiday with ID ${id} not found`);
    }
    return holiday;
  }

  async remove(id: string): Promise<Holiday> {
    const holiday = await this.holidayModel.findByIdAndDelete(id).exec();
    if (!holiday) {
      throw new NotFoundException(`Holiday with ID ${id} not found`);
    }
    return holiday;
  }

  async findByStore(storeId: string): Promise<Holiday[]> {
    return this.holidayModel.find({ storeId }).exec();
  }

  async findByDate(date: string): Promise<Holiday[]> {
    const startDate = new Date(date);
    startDate.setHours(0, 0, 0, 0);
    const endDate = new Date(date);
    endDate.setHours(23, 59, 59, 999);

    return this.holidayModel.find({
      date: {
        $gte: startDate,
        $lte: endDate,
      },
    }).exec();
  }

  async findByMonth(year: number, month: number): Promise<Holiday[]> {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    return this.holidayModel.find({
      date: {
        $gte: startDate,
        $lte: endDate,
      },
    }).exec();
  }

  async updateStatus(id: string, status: string): Promise<Holiday> {
    const holiday = await this.holidayModel
      .findByIdAndUpdate(id, { status }, { new: true })
      .exec();
    if (!holiday) {
      throw new NotFoundException(`Holiday with ID ${id} not found`);
    }
    return holiday;
  }
}