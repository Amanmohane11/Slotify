import mongoose from "mongoose";

const options = { discriminatorKey: "type", timestamps: true };

/* ---------------- Base Appointment ---------------- */
const baseAppointmentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  familyMemberId: { type: mongoose.Schema.Types.ObjectId },
  date: { type: Date, required: true },
  slot: { type: mongoose.Schema.Types.ObjectId, ref: "Slot" },
  // e.g. "10:00-10:30 AM"
  
  queueNumber: { type: Number },      // Queue position
  estimatedTime: { type: Number },    // Estimated wait time (mins)
  status: {
    type: String,
    enum: ["pending", "confirmed", "completed", "cancelled"],
    default: "pending"
  }
}, options);

const Appointment = mongoose.model("Appointment", baseAppointmentSchema);

/* ---------------- Doctor Appointment ---------------- */
const DoctorAppointment = Appointment.discriminator(
  "DoctorAppointment",
  new mongoose.Schema({
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true },
    hospital: { type: mongoose.Schema.Types.ObjectId, ref: "Hospital" },
    department: { type: String }
  })
);

/* ---------------- Lab Appointment ---------------- */
const LabAppointment = Appointment.discriminator(
  "LabAppointment",
  new mongoose.Schema({
    lab: { type: mongoose.Schema.Types.ObjectId, ref: "Lab", required: true },
    testName: { type: String, required: true }, // Example: "Blood Test"
    fastingRequired: { type: Boolean, default: false }
  })
);

/* ---------------- Salon Appointment ---------------- */
const SalonAppointment = Appointment.discriminator(
  "SalonAppointment",
  new mongoose.Schema({
    salon: { type: mongoose.Schema.Types.ObjectId, ref: "Salon", required: true },
    service: { type: String, required: true }, // Example: "Haircut"
    stylist: { type: mongoose.Schema.Types.ObjectId, ref: "Stylist" }
  })
);

export { Appointment, DoctorAppointment, LabAppointment, SalonAppointment };
