import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Attendance } from '../schemas/attendance.schema';
import { CreateAttendanceDTO, UpdateAttendanceDTO } from '../dtos/attendance.dto';

@Injectable()
export class AttendanceService {
  constructor(@InjectModel('Attendances') private attendanceModel: Model<Attendance>) {}

  // Thêm mới attendance
  async create(createAttendance: CreateAttendanceDTO): Promise<Attendance> {
    const lastUser = await this.attendanceModel.findOne().sort({ attendanceId: -1 }).exec();
    let newAttendanceId = 'ATT00001';

    if (lastUser && lastUser.attendanceId) {
      const lastNumber = parseInt(lastUser.attendanceId.replace('ATT', ''), 10);
      const nextNumber = lastNumber + 1;
      newAttendanceId = `ATT${nextNumber.toString().padStart(5, '0')}`;
    }

    const createdAttendance = new this.attendanceModel({
      ...createAttendance,
      attendanceId: newAttendanceId
    });

    return createdAttendance.save();
  }

  async findAll(): Promise<Attendance[]> {
    return this.attendanceModel.find().exec();
  }

  // Lấy một attendance theo ID
  async findOne(id: string): Promise<Attendance> {
    const attendance = await this.attendanceModel.findById(id).exec();
    if (!attendance) {
      throw new Error(`Attendance with ID ${id} not found`);
    }
    return attendance;
  }

  // Cập nhật attendance
  async update(id: string, updateAttendanceDto: UpdateAttendanceDTO): Promise<Attendance> {
    const updatedAttendance = await this.attendanceModel.findByIdAndUpdate(id, updateAttendanceDto, { new: true }).exec();
    if (!updatedAttendance) {
      throw new Error(`Attendance with ID ${id} not found`);
    }
    return updatedAttendance;
  }

  // Xóa attendance
  async remove(id: string): Promise<Attendance> {
    const deletedAttendance = await this.attendanceModel.findByIdAndDelete(id).exec();
    if (!deletedAttendance) {
      throw new Error(`Attendance with ID ${id} not found`);
    }
    return deletedAttendance;
  }
}