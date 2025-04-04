import mongoose from "mongoose";

const AttendanceSchema = new mongoose.Schema({
  attendanceId: { type: String, unique: true }, // Mã chấm công
  employeeId: { type: Schema.Types.ObjectId, ref: "Employees" }, // Tham chiếu nhân viên
  date: { type: Date }, // Ngày chấm công
  checkIn: { type: Date }, // Giờ vào
  checkOut: { type: Date }, // Giờ ra
  status: {
    type: String,
    enum: ["Đúng giờ", "Đi muộn", "Về sớm", "Chưa chấm công", "Nghỉ làm"],
  }, // Trạng thái
  createdAt: { type: Date, default: Date.now },
});

const Attendances = mongoose.model("Attendances", AttendanceSchema);

export default Attendances;
