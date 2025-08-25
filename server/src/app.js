const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const session = require("express-session");
const passport = require("passport");
require("./config/googleStrategy");
const authRoutes = require("./routes/authRoutes");
const studentRoutes = require("./routes/studentRoutes");
const searchRoutes = require("./routes/searchRoutes");
const errorHandler = require("./middleware/errorHandler");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// ✅ Serve frontend from ../client
app.use(express.static(path.join(__dirname, "../../client/public")));

// Session required for passport
app.use(session({ secret: "secret", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/search", searchRoutes);

// Error handler (last middleware)
app.use(errorHandler);

// app.get("/", (req, res) => {
//   res.send("🚀 Student Skill Hub API with JWT + Google OAuth running...");
// });


// Default route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../../client/public/index.html"));
});



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
