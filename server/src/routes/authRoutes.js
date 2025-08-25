const express = require("express");
const passport = require("passport");
const router = express.Router();

// Import controller functions
const {
  register,
  login,
  googleAuthCallback,   // ✅ Add this
} = require("../controllers/authController");

// ===================== Email/Password Authentication =====================

// POST /api/auth/register



router.post("/register", register);

// POST /api/auth/login
router.post("/login", login);

// ===================== Google OAuth Authentication =====================

//Start Google OAuth login
//GET /api/auth/google
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google OAuth callback
// GET /api/auth/google/callback
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login.html" }),
  googleAuthCallback
);

module.exports = router;
