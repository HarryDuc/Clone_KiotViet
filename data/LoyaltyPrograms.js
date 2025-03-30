import mongoose from "mongoose";

const loyaltyProgramSchema = new mongoose.Schema({
  storeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Stores",
    required: true,
  },
  name: { type: String, required: true },
  description: { type: String },
  status: {
    type: String,
    enum: ["Đang hoạt động", "Ngừng hoạt động"],
    default: "Đang hoạt động",
  },
  pointRules: {
    earnRate: { type: Number }, // Tỷ lệ tích điểm (ví dụ: 1% doanh thu)
    minPoints: { type: Number }, // Số điểm tối thiểu để đổi
    pointValue: { type: Number }, // Giá trị của 1 điểm (VND)
    expiryDays: { type: Number }, // Số ngày điểm hết hạn
  },
  tiers: [
    {
      name: { type: String, required: true },
      minPoints: { type: Number, required: true },
      benefits: [
        {
          type: {
            type: String,
            enum: ["Giảm giá", "Miễn phí vận chuyển", "Quà tặng", "Quyền truy cập đặc biệt"],
          },
          value: { type: Number }, // Giá trị phần thưởng
          description: { type: String },
        },
      ],
    },
  ],
  rewards: [
    {
      name: { type: String, required: true },
      points: { type: Number, required: true },
      description: { type: String },
      image: { type: String },
      stock: { type: Number },
      status: {
        type: String,
        enum: ["Có sẵn", "Hết hàng", "Không hoạt động"],
        default: "Có sẵn",
      },
    },
  ],
  statistics: {
    totalMembers: { type: Number, default: 0 },
    totalPointsIssued: { type: Number, default: 0 },
    totalPointsRedeemed: { type: Number, default: 0 },
    totalRewardsRedeemed: { type: Number, default: 0 },
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Indexes
loyaltyProgramSchema.index({ storeId: 1 });
loyaltyProgramSchema.index({ status: 1 });
loyaltyProgramSchema.index({ "tiers.minPoints": 1 });
loyaltyProgramSchema.index({ "rewards.points": 1 });
loyaltyProgramSchema.index({ "rewards.status": 1 });

export default mongoose.model("LoyaltyPrograms", loyaltyProgramSchema);
