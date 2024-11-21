import mongoose from "mongoose";

export const DataBaseConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Database connection successful");
  } catch (error) {
    console.error("Database connection failed:", error.message); // Log the error message for better debugging
    process.exit(1);
  }
};
