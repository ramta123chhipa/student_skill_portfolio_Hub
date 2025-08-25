const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middleware/authMiddleware");
const { searchStudents } = require("../controllers/searchController");

// ✅ CORRECT
router.get("/", searchStudents);

module.exports = router;
