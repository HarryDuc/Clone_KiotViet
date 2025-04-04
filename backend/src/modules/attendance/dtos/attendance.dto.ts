export class AttendanceDTO {
  attendanceId: string;
  employeeId: string;
  date: Date;
  checkIn: Date;
  checkOut: Date;
  status: string;
  createdAt: Date;
  absenceReason?: string;
  overtimeHours: number; // Thêm
  lateMinutes: number; // Thêm
}

export class CreateAttendanceDTO {
  employeeId: string;
  date: Date;
  checkIn: Date;
  checkOut: Date;
  status: string;
  absenceReason?: string;
  overtimeHours?: number; // Tùy chọn
  lateMinutes?: number; // Tùy chọn
}

export class UpdateAttendanceDTO {
  date?: Date;
  checkIn?: Date;
  checkOut?: Date;
  status?: string;
  absenceReason?: string;
  overtimeHours?: number; // Tùy chọn
  lateMinutes?: number; // Tùy chọn
}