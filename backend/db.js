import mongoose from "mongoose";
 

export const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI?.trim().replace(/^['"]|['"]$/g, "");

    if (!mongoUri) {
      throw new Error("MONGO_URI is not defined");
    }

    await mongoose.connect(mongoUri, {
      dbName: "Code2Place",
    });
    console.log("MongoDB Connected");
  } catch (err) {
    console.error("MongoDB Connection Error:", err);
    process.exit(1);
  }
};
