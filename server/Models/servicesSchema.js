import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
  business: { type: mongoose.Schema.Types.ObjectId, ref: "Business", required: true },
  name: { type: String, required: true },
  description: String,
  tags: [String], // e.g. ["hair", "spa", "massage"]
  price: { type: Number, required: true },
  duration: { type: Number, required: true }, // in minutes
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.model("Service", serviceSchema);
