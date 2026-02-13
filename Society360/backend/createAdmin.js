require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");

const createAdmin = async () => {
  try {
    // Connect to MongoDB
    const uri = process.env.MONGO_URL;
    await mongoose.connect(uri);
    console.log("✅ Connected to MongoDB");

    // Admin credentials
    const adminEmail = "admin@society360.com";
    const adminPassword = "admin123456";
    const adminUsername = "Admin";

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: adminEmail });
    if (existingAdmin) {
      console.log("⚠️ Admin user already exists!");
      await mongoose.connection.close();
      return;
    }

    // Create new admin user
    const admin = new User({
      email: adminEmail,
      username: adminUsername,
      password: adminPassword,
      role: "admin",
      createdAt: new Date()
    });

    // Hash password before saving (middleware will handle this)
    await admin.save();

    console.log("✅ Admin user created successfully!");
    console.log("📧 Email: " + adminEmail);
    console.log("🔑 Password: " + adminPassword);
    console.log("\n⚠️  IMPORTANT: Change this password after first login!");

    // Close connection
    await mongoose.connection.close();
    console.log("✅ Database connection closed");
  } catch (error) {
    console.error("❌ Error creating admin:", error.message);
    await mongoose.connection.close();
  }
};

createAdmin();
