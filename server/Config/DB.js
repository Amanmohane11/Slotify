import mongoose from "mongoose";

let isConnected = false; // Track connection state

export async function connectDB() {
  try {
    if (isConnected) {
      console.log("MongoDB already connected.");
      return;
    }

    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = conn.connections[0].readyState === 1;
    console.log(`✅ Connected to MongoDB: ${conn.connection.host}`);
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1); // stop the app if DB connection fails
  }
}
