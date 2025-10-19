import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },

  email: {
    type: String,
    unique: true,
    sparse: true,
    lowercase: true,
    trim: true,
    validate: {
      validator: v => !v || /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v),
      message: 'Invalid email format'
    }
  },

  phone: {
    type: String,
    unique: true,
    required: true,
    match: /^[0-9]{10}$/
  },

  password: {
    type: String,
    required: function () {
      return this.role === "businessOwner" || this.role === "admin";
    },
  },

  role: {
    type: String,
    enum: ["customer", "businessOwner", "admin"],
    default: "customer",
  },

  profileImage: { type: String },
  isActive: { type: Boolean, default: true },
  lastLogin: { type: Date },

  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      default: [0, 0]
    }
  }

}, { timestamps: true });

userSchema.index({ location: '2dsphere' });

export default mongoose.model("User", userSchema);
