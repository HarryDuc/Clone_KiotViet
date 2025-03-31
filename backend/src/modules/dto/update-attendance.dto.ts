export class UpdateAttendanceDto {
  attendanceId?: string;
  employeeId?: string;
  date?: Date;
  checkIn?: Date;
  checkOut?: Date;
  status?: string;
}