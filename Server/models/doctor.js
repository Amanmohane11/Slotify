import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Link doctor → user (name, email, phone will come from User)
      required: true,
    },

    photo: { type: String }, // doctor profile picture
    specialization: { type: String, required: true }, // e.g. Cardiologist
    qualification: { type: String, required: true }, // e.g. MBBS, MD, MS, DNB
    department: { type: String, required: true }, // e.g. "Cardiology"
    fees: { type: Number, required: true },

    hospital: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hospital",
      required: true,
    },

    experience: { type: Number, default: 0 }, // in years

    availableDays: [{ type: String }], // e.g. ["Mon", "Wed", "Fri"]

    availableTime: {
      start: { type: String }, // "10:00 AM"
      end: { type: String },   // "04:00 PM"
    },
  },
  { timestamps: true }
);

export default mongoose.model("Doctor", doctorSchema);
