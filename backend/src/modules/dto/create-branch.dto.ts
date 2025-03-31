export class CreateBranchDto {
  attendanceId: string;
  employeeId: string; // Chuỗi vì sẽ được chuyển thành ObjectId trong schema
  date: Date;
  checkIn: Date;
  checkOut: Date;
  status: string;
}