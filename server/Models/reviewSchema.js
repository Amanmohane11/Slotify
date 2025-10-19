import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  reviewer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  business: { type: mongoose.Schema.Types.ObjectId, ref: "Business" },
  professional: { type: mongoose.Schema.Types.ObjectId, ref: "Professional" },
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: String,
  isVerified: { type: Boolean, default: false },
}, { timestamps: true });

reviewSchema.index({ business: 1, professional: 1 });

export default mongoose.model("Review", reviewSchema);
