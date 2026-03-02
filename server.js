require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const complaintRoutes = require("./routes/complaintRoutes");
const authRoutes = require("./routes/authRoutes");
const cors = require("cors");

const app = express();

// Connect to MongoDB
connectDB();

// Middlewares
app.use(cors({
  origin: "https://splendorous-cassata-688a6a.netlify.app",
  credentials: true
}));

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/complaints", complaintRoutes);

// Optional homepage route
app.get("/", (req, res) => res.send("Server running ✅"));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));