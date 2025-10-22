import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  business: { type: mongoose.Schema.Types.ObjectId, ref: "Business", required: true },
  professional: { type: mongoose.Schema.Types.ObjectId, ref: "Professional", required: true },

  services: [
    {
      service: { type: mongoose.Schema.Types.ObjectId, ref: "Service", required: true },
      price: { type: Number, required: true },
      duration: { type: Number, required: true }
    }
  ],

  date: { type: Date, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },

  status: {
    type: String,
    enum: ["pending", "confirmed", "completed", "cancelled", "needs_reschedule"],
    default: "pending"
  },
  paymentStatus: {
    type: String,
    enum: ["pending", "paid", "refunded"],
    default: "pending"
  },

  totalAmount: { type: Number, required: true },
  notes: String,

  isActive: { type: Boolean, default: true },

  // 🔔 NEW FIELD: so customer can be notified if appointment needs reschedule
  customerNotification: { type: Boolean, default: false },

  rescheduleHistory: [
    {
      oldDate: Date,
      oldStartTime: String,
      newDate: Date,
      newStartTime: String,
      reason: String,
      changedAt: { type: Date, default: Date.now },
      changedBy: { type: String, default: "system" } // optional: system / owner / customer
    }
  ],

}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });

appointmentSchema.index({ business: 1, date: 1 });
appointmentSchema.index({ professional: 1, date: 1 });

export default mongoose.model("Appointment", appointmentSchema);
