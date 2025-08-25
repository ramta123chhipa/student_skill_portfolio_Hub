const {
  createProfile,
  getProfiles,
  getProfileById,
  updateProfile,
  deleteProfile,
} = require("../models/studentModel");

// Create profile
const addProfile = async (req, res) => {
  try {
    const { full_name, branch, year, github_link, linkedin_link, bio } = req.body;
    const user_id = req.user.id; // from JWT

    const profile = await createProfile(
      user_id,
      full_name,
      branch,
      year,
      github_link,
      linkedin_link,
      bio
    );

    res.status(201).json(profile);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get all profiles
const getAllProfiles = async (req, res) => {
  try {
    const profiles = await getProfiles();
    res.json(profiles);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get profile by ID
const getSingleProfile = async (req, res) => {
  try {
    const profile = await getProfileById(req.params.id);
    if (!profile) return res.status(404).json({ message: "Profile not found" });
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Update profile
const editProfile = async (req, res) => {
  try {
    const { full_name, branch, year, github_link, linkedin_link, bio } = req.body;
    const updated = await updateProfile(
      req.params.id,
      full_name,
      branch,
      year,
      github_link,
      linkedin_link,
      bio
    );
    if (!updated) return res.status(404).json({ message: "Profile not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Delete profile
const removeProfile = async (req, res) => {
  try {
    const deleted = await deleteProfile(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Profile not found" });
    res.json({ message: "Profile deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = { addProfile, getAllProfiles, getSingleProfile, editProfile, removeProfile };
