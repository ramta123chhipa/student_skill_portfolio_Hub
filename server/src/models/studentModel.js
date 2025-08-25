const pool = require("../config/db");

// Create
const createProfile = async (user_id, full_name, branch, year, github, linkedin, bio) => {
  const result = await pool.query(
    `INSERT INTO profiles (user_id, full_name, branch, year, github_link, linkedin_link, bio) 
     VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`,
    [user_id, full_name, branch, year, github, linkedin, bio]
  );
  return result.rows[0];
};

// Read all
const getProfiles = async () => {
  const result = await pool.query("SELECT * FROM profiles ORDER BY created_at DESC");
  return result.rows;
};

// Read one
const getProfileById = async (id) => {
  const result = await pool.query("SELECT * FROM profiles WHERE id = $1", [id]);
  return result.rows[0];
};

// Update
const updateProfile = async (id, full_name, branch, year, github, linkedin, bio) => {
  const result = await pool.query(
    `UPDATE profiles 
     SET full_name=$1, branch=$2, year=$3, github_link=$4, linkedin_link=$5, bio=$6 
     WHERE id=$7 RETURNING *`,
    [full_name, branch, year, github, linkedin, bio, id]
  );
  return result.rows[0];
};

// Delete
const deleteProfile = async (id) => {
  await pool.query("DELETE FROM profiles WHERE id = $1", [id]);
  return true;
};

module.exports = { createProfile, getProfiles, getProfileById, updateProfile, deleteProfile };
