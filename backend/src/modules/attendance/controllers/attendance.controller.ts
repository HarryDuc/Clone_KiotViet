import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { AttendanceService } from '../services/attendance.service';
import { CreateAttendanceDto } from '../dtos/create-attendance.dto';
import { UpdateAttendanceDto } from '../dtos/update-attendance.dto';
import { Attendance } from '../schemas/attendance.schema';

@Controller('api/attendances')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) { }

  @Post()
  async create(@Body() createAttendanceDto: CreateAttendanceDto): Promise<Attendance> {
    return this.attendanceService.create(createAttendanceDto);
  }

  @Get()
  async findAll(): Promise<Attendance[]> {
    return this.attendanceService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Attendance> {
    return this.attendanceService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateAttendanceDto: UpdateAttendanceDto): Promise<Attendance> {
    return this.attendanceService.update(id, updateAttendanceDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Attendance> {
    return this.attendanceService.remove(id);
  }
}