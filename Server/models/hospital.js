import mongoose from "mongoose";

const hospitalSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Hospital admin/owner user account
      required: true,
    },

    // Hospital-specific details
    hospitalName: { type: String, required: true },
    address: { type: String, required: true },
    contactNumber: { type: String }, // hospital landline/desk
    email: { type: String },
    logo: { type: String },

    // Departments like Cardiology, Orthopedics, Pathology, etc.
    departments: [
      {
        name: { type: String, required: true },
        doctors: [{ type: mongoose.Schema.Types.ObjectId, ref: "Doctor" }],
      },
    ],

    // Blood Bank
    bloodBank: [
      {
        category: {
          type: String,
          enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
          required: true,
        },
        available: { type: Boolean, default: false },
        units: { type: Number, default: 0 },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Hospital", hospitalSchema);
