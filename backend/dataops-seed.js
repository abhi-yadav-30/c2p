import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/userSchema.js";
import { connectDB } from "./db.js";

// Load environment variables
dotenv.config();

console.log("========================================");
console.log("🚀 Starting DataOps Pipeline...");
console.log("========================================");

const runDataOps = async () => {
  try {
    // 1. Database Connection Stage
    console.log("[DataOps] Stage 1: Connecting to Database...");
    await connectDB();

    // 2. Data Cleaning Stage
    console.log("[DataOps] Stage 2: Purging old test data...");
    const deleteResult = await User.deleteMany({ email: { $regex: "@test.com$" } });
    console.log(`[DataOps] Cleared ${deleteResult.deletedCount} old test records.`);

    // 3. Data Mocking / Seeding Stage
    console.log("[DataOps] Stage 3: Preparing Seed Data...");
    const mockUsers = [
      {
        name: "Test User 1",
        username: "testuser1",
        email: "user1@test.com",
        password: "hashedpassword123", // In a real scenario, this would be properly hashed
        codeScore: 85,
        resourceSharingScore: 10,
        interviewScore: 90
      },
      {
        name: "Test User 2",
        username: "testuser2",
        email: "user2@test.com",
        password: "hashedpassword123",
        codeScore: 70,
        resourceSharingScore: 25,
        interviewScore: 80
      }
    ];

    // 4. Data Quality / Validation Stage
    console.log("[DataOps] Stage 4: Validating Data Integrity...");
    let validRecords = [];
    for (const userData of mockUsers) {
      const user = new User(userData);
      const validationError = user.validateSync();
      
      if (validationError) {
        console.error(`[DataOps - Error] Data Validation Failed for ${userData.email}:`, validationError.message);
      } else {
        validRecords.push(userData);
      }
    }
    console.log(`[DataOps] ${validRecords.length}/${mockUsers.length} records passed schema validation.`);

    // 5. Data Ingestion Stage
    if (validRecords.length > 0) {
      console.log("[DataOps] Stage 5: Ingesting Validated Data...");
      await User.insertMany(validRecords);
      console.log(`[DataOps] Successfully ingested ${validRecords.length} records into the database.`);
    }

    console.log("========================================");
    console.log("✅ DataOps Pipeline Completed Successfully!");
    console.log("========================================");

  } catch (error) {
    console.error("❌ DataOps Pipeline Failed:");
    console.error(error);
  } finally {
    // Close the database connection
    mongoose.connection.close();
    process.exit(0);
  }
};

runDataOps();
