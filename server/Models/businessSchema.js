import mongoose from "mongoose";

const businessSchema = new mongoose.Schema({
  owner: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true,
    index: true // faster lookup
  },

  name: { type: String, required: true, trim: true },
  category: { type: String, required: true, trim: true },

  address: { type: String, required: true, trim: true },
  city: { type: String, trim: true },
  state: { type: String, trim: true },
  pincode: { type: String, trim: true },

  contactNumber: { type: String, trim: true },
  email: { type: String, trim: true },

  description: { type: String, trim: true },
  images: [{ type: String }],

  gstNumber: { type: String, trim: true },
  gstCertificate: { type: String },

  // Ratings
  ratingsAverage: { type: Number, default: 0, min: 0, max: 5 },
  ratingsCount: { type: Number, default: 0 },

  // Geo Location
  location: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], default: [0, 0] }
  },

  // Booking controls
  isBookingActive: { type: Boolean, default: true }, // global shop closure
  closureDates: [  // optional partial day closures
    {
      date: { type: Date, required: true },
      startTime: String,
      endTime: String,
      reason: String
    }
  ],

  isApproved: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },

}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });

// Index for geo queries
businessSchema.index({ location: '2dsphere' });

export default mongoose.model("Business", businessSchema);
