import mongoose from "mongoose";

export const DataBaseConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connection successful");
  } catch (error) {
    console.log("Database connection failed");
    process.exit(1);
  }
};
