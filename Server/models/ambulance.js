import mongoose from "mongoose";

const ambulanceSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, 
    // Owner account (hospital admin or ambulance provider)

    hospital: { type: mongoose.Schema.Types.ObjectId, ref: "Hospital" }, 
    // Optional – only if registered under hospital

    driverName: { type: String, required: true },
    driverPhone: { type: String, required: true },

    ambulanceNumber: { type: String, required: true, unique: true }, // vehicle number
    type: { 
      type: String, 
      enum: ["Basic", "Advanced", "ICU"], 
      default: "Basic" 
    },

    // ✅ GeoJSON for location
    location: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: true,
      },
    },

    available: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// 🔎 Enable geospatial queries
ambulanceSchema.index({ location: "2dsphere" });

export default mongoose.model("Ambulance", ambulanceSchema);
