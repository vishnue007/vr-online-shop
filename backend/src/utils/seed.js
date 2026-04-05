import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import Admin from "../models/Admin.js";
dotenv.config();

const seed = async () => {
  await mongoose.connect(process.env.MONGO_URI);

  const password = await bcrypt.hash("admin123", 10);

  const admin = new Admin({ email: "admin@example.com", password });

  await admin.save();
  console.log("Admin seeded");
  process.exit(0);
};

seed();