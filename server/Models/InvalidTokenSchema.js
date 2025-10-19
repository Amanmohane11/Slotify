import mongoose from "mongoose";

const blacklistedTokenSchema = new mongoose.Schema({
    token: String,
    expiresAt: Date,
  });
  
  blacklistedTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
  export default mongoose.model("BlacklistedToken", blacklistedTokenSchema);
  