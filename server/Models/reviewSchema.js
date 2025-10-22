import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    reviewer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    business: { type: mongoose.Schema.Types.ObjectId, ref: "Business", required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    comment: String,
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Prevent a user from reviewing the same business multiple times
reviewSchema.index({ business: 1, reviewer: 1 }, { unique: true });

export default mongoose.model("Review", reviewSchema);
