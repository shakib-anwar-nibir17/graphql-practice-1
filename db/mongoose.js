import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
  try {
    const uri = process.env.ATLAS_URI;
    if (!uri) throw new Error("MongoDB URI is not defined in .env file");

    await mongoose.connect(uri);

    console.log("MongoDB connected with Mongoose.");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

export default connectDB;
