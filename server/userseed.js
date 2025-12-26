import "dotenv/config";
import user from "./models/user.js";
import bcrypt from "bcrypt";
import connectDB from "./db/db.js";

const userRegister = async () => {
  await connectDB();
  try {
    const hashPassword = await bcrypt.hash("admin", 10);
    const newUser = new user({
      name: "Admin",
      email: "admin@gmail.com",
      password: hashPassword,
      role: "admin",
    });
    await newUser.save();
    console.log("User created successfully!");
    process.exit(0);
  } catch (err) {
    console.error("Error in user seeding:", err);
    process.exit(1);
  }
};

userRegister();
