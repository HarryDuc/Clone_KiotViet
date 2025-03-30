import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { WorkSchedule, WorkScheduleDocument } from '../schemas/work-schedule.schema';

@Injectable()
export class WorkScheduleService {
  constructor(
    @InjectModel(WorkSchedule.name)
    private workScheduleModel: Model<WorkScheduleDocument>,
  ) { }

  async create(createWorkScheduleDto: any): Promise<WorkSchedule> {
    const createdSchedule = new this.workScheduleModel(createWorkScheduleDto);
    return createdSchedule.save();
  }

  async findAll(): Promise<WorkSchedule[]> {
    return this.workScheduleModel.find().exec();
  }

  async findOne(id: string): Promise<WorkSchedule> {
    const schedule = await this.workScheduleModel.findById(id).exec();
    if (!schedule) {
      throw new NotFoundException(`Work schedule with ID ${id} not found`);
    }
    return schedule;
  }

  async update(id: string, updateWorkScheduleDto: any): Promise<WorkSchedule> {
    const schedule = await this.workScheduleModel
      .findByIdAndUpdate(id, updateWorkScheduleDto, { new: true })
      .exec();
    if (!schedule) {
      throw new NotFoundException(`Work schedule with ID ${id} not found`);
    }
    return schedule;
  }

  async remove(id: string): Promise<WorkSchedule> {
    const schedule = await this.workScheduleModel.findByIdAndDelete(id).exec();
    if (!schedule) {
      throw new NotFoundException(`Work schedule with ID ${id} not found`);
    }
    return schedule;
  }

  async findByStore(storeId: string): Promise<WorkSchedule[]> {
    return this.workScheduleModel.find({ storeId }).exec();
  }

  async findByEmployee(employeeId: string): Promise<WorkSchedule[]> {
    return this.workScheduleModel.find({ employeeId }).exec();
  }

  async findSpecialSchedulesByDate(date: Date): Promise<WorkSchedule[]> {
    return this.workScheduleModel
      .find({
        'specialSchedules.date': {
          $gte: new Date(date.setHours(0, 0, 0, 0)),
          $lt: new Date(date.setHours(23, 59, 59, 999))
        }
      })
      .exec();
  }

  async updateSpecialSchedule(
    id: string,
    specialSchedule: {
      date: Date;
      isWorking: boolean;
      startTime: string;
      endTime: string;
      breakTime: string;
      reason: string;
    }
  ): Promise<WorkSchedule> {
    const schedule = await this.workScheduleModel.findById(id);
    if (!schedule) {
      throw new NotFoundException(`Work schedule with ID ${id} not found`);
    }

    const existingScheduleIndex = schedule.specialSchedules.findIndex(
      s => s.date.getTime() === specialSchedule.date.getTime()
    );

    if (existingScheduleIndex >= 0) {
      schedule.specialSchedules[existingScheduleIndex] = specialSchedule;
    } else {
      schedule.specialSchedules.push(specialSchedule);
    }

    return schedule.save();
  }
}