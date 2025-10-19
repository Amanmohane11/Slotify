import mongoose from "mongoose";

const options = { timestamps: true };

/* ---------------- Slot Schema ---------------- */
const slotSchema = new mongoose.Schema({
  provider: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: "providerModel", // can be Doctor, Lab, Salon
    required: true
  },
  providerModel: {
    type: String,
    enum: ["Doctor", "Lab", "Salon"], // dynamic ref
    required: true
  },

  date: { type: Date, required: true }, // e.g., 2025-09-01
  time: { type: String, required: true }, // e.g., "14:00"

  status: {
    type: String,
    enum: ["available", "booked", "blocked"],
    default: "available"
  },

  appointment: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Appointment" 
  }, // linked if booked

  blockedReason: { 
    type: String 
  } // e.g., "Doctor on leave", "Machine maintenance"
}, options);

const Slot = mongoose.model("Slot", slotSchema);

export { Slot };
