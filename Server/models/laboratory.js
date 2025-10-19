import mongoose from "mongoose";

const labSchema = new mongoose.Schema(
  {
    // Reference to User (lab owner / manager)
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    hospital: { type: mongoose.Schema.Types.ObjectId, ref: "Hospital", default: null },

    name: { type: String, required: true },
    address: { type: String, required: true },
    contactNumber: { type: String },
    email: { type: String },
    logo: { type: String }, // optional: lab logo

    // Tests offered in this lab
    tests: [
      {
        name: { type: String, required: true }, // e.g. "Blood Sugar", "X-Ray"
        category: { type: String }, // e.g. "Pathology", "Radiology"
        price: { type: Number, required: true },
        available: { type: Boolean, default: true },
        reportDeliveryTime: { type: String }, // e.g. "24 hours"
      },
    ],

    // Technicians who work at the lab
    technicians: [
      {
        name: { type: String, required: true },
        qualification: { type: String }, // e.g. "DMLT"
        phone: { type: String },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Lab", labSchema);
