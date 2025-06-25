require("dotenv").config();
const authRoutes = require("./routes/auth");
const authMiddleware = require("./middleware/authMiddleware");
const mongoose = require("mongoose");
const User = require("./models/User");
app.use("/api/auth", authRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

const express = require("express");
const app = express();
const PORT = 5000;

app.use(express.json());

app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({ message: "You’re authenticated", user: req.user });
});

app.get("/", (req, res) => {
  res.send("Welcome to your backend path Savya");
});

app.get("/about", (req, res) => {
  res.send("It's Savya, a full stack developer with MERN stack expertise");
});
