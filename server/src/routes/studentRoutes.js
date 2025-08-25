const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  addProfile,
  getAllProfiles,
  getSingleProfile,
  editProfile,
  removeProfile,
} = require("../controllers/studentController");

const router = express.Router();

router.post("/", authMiddleware, addProfile);      // Create
router.get("/", getAllProfiles);                   // Read all
router.get("/:id", getSingleProfile);              // Read one
router.put("/:id", authMiddleware, editProfile);   // Update
router.delete("/:id", authMiddleware, removeProfile); // Delete

module.exports = router;
