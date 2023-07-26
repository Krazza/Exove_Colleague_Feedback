import mongoose from "mongoose";
import { MONGO_URI } from "../utils/config";

export const connectDB = async () => {
  if (!MONGO_URI) {
    console.log("MONGO URI is not defined in env file");
    process.exit(1);
  }

  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};
