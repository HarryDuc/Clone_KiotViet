import mongoose from "mongoose";

const customerLoyaltyPointsSchema = new mongoose.Schema({
  storeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Stores",
    required: true,
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customers",
    required: true,
  },
  programId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "LoyaltyPrograms",
    required: true,
  },
  currentPoints: { type: Number, default: 0 },
  totalPointsEarned: { type: Number, default: 0 },
  totalPointsRedeemed: { type: Number, default: 0 },
  tier: { type: String }, // Tên tier hiện tại
  pointsHistory: [
    {
      type: {
        type: String,
        enum: ["Kiếm tiền", "Quy đổi", "Hết hạn", "Điều chỉnh"],
        required: true,
      },
      points: { type: Number, required: true },
      orderId: { type: mongoose.Schema.Types.ObjectId, ref: "Orders" },
      rewardId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "LoyaltyPrograms.rewards",
      },
      description: { type: String },
      expiryDate: { type: Date },
      createdAt: { type: Date, default: Date.now },
    },
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Indexes
customerLoyaltyPointsSchema.index({ storeId: 1 });
customerLoyaltyPointsSchema.index({ customerId: 1 });
customerLoyaltyPointsSchema.index({ programId: 1 });
customerLoyaltyPointsSchema.index({ "pointsHistory.type": 1 });
customerLoyaltyPointsSchema.index({ "pointsHistory.expiryDate": 1 });

export default mongoose.model(
  "CustomerLoyaltyPoints",
  customerLoyaltyPointsSchema
);
