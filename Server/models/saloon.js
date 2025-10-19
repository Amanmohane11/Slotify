import mongoose from "mongoose";

const salonSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Link to user (salon owner)
      required: true,
    },

    name: { type: String, required: true }, // Salon name

    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      pincode: { type: String, required: true },
      location: {
        type: {
          type: String,
          enum: ["Point"],
          default: "Point",
        },
        coordinates: {
          type: [Number], // [longitude, latitude]
          default: [0, 0],
        },
      },
    },


    services: [
      {
        name: { type: String, required: true }, // e.g. "Haircut"
        price: { type: Number, required: true }, // ₹300
        duration: { type: Number, required: true }, // Duration in minutes
      },
    ],

    stylists: [
      {
        name: { type: String, required: true },
        specialization: { type: String }, // e.g. "Hair Stylist"
        experience: { type: Number }, // years
      },
    ],

    openingHours: {
      monday: { type: String, default: "09:00-18:00" },
      tuesday: { type: String, default: "09:00-18:00" },
      wednesday: { type: String, default: "09:00-18:00" },
      thursday: { type: String, default: "09:00-18:00" },
      friday: { type: String, default: "09:00-18:00" },
      saturday: { type: String, default: "10:00-17:00" },
      sunday: { type: String, default: "Closed" },
    },
  },
  { timestamps: true }
);

salonSchema.index({ "address.location": "2dsphere" }); // for geo queries

export default mongoose.model("Salon", salonSchema);
