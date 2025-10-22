import mongoose from "mongoose";

const professionalSchema = new mongoose.Schema({
  business: { type: mongoose.Schema.Types.ObjectId, ref: "Business", required: true, index: true },

  name: { type: String, required: true, trim: true },
  specialization: [{ type: String, trim: true }],
  phone: { type: String, unique: true, required: true, match: /^[0-9]{10}$/, trim: true },
  gender: { type: String, enum: ["male", "female", "other"], default: "other" },
  age: { type: Number, min: 18, max: 100 },
  experience: { type: Number, min: 0, default: 0 },
  photo: { type: String, trim: true },

  isActive: { type: Boolean, default: true },

  // Weekly recurring schedule
  schedule: [
    {
      dayOfWeek: { type: Number, required: true, min: 0, max: 6 },
      startTime: { type: String, required: true },
      endTime: { type: String, required: true },
    }
  ],

  breaks: [
    {
      dayOfWeek: { type: Number, required: true }, // 0-6
      startTime: { type: String, required: true },
      endTime: { type: String, required: true },
      label: { type: String,enum:["Lunch","Dinner"], default: "Lunch" }
    }
  ],

  // Time-off for specific dates
  timeOff: [
    {
      date: { type: Date, required: true },
      startTime: String, // optional partial day
      endTime: String,
      reason: { type: String, trim: true }
    }
  ],

}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });

// Index to quickly find active professionals by business
professionalSchema.index({ business: 1, isActive: 1 });

export default mongoose.model("Professional", professionalSchema);
