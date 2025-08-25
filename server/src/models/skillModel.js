const pool = require("../config/db");

// ✅ Get all skills
const getAllSkills = async () => {
  const { rows } = await pool.query("SELECT * FROM skills ORDER BY name ASC");
  return rows;
};

// ✅ Create new skill
const createSkill = async (name) => {
  const { rows } = await pool.query(
    "INSERT INTO skills (name) VALUES ($1) RETURNING *",
    [name]
  );
  return rows[0];
};

// ✅ Find skill by name
const findSkillByName = async (name) => {
  const { rows } = await pool.query(
    "SELECT * FROM skills WHERE name ILIKE $1",
    [name]
  );
  return rows[0];
};

// ✅ Assign skill to a student
const assignSkillToStudent = async (studentId, skillId) => {
  const { rows } = await pool.query(
    "INSERT INTO student_skills (student_id, skill_id) VALUES ($1, $2) RETURNING *",
    [studentId, skillId]
  );
  return rows[0];
};

// ✅ Get all skills of a student
const getSkillsByStudent = async (studentId) => {
  const { rows } = await pool.query(
    `
    SELECT s.id, s.name
    FROM student_skills ss
    JOIN skills s ON ss.skill_id = s.id
    WHERE ss.student_id = $1
    `,
    [studentId]
  );
  return rows;
};

module.exports = {
  getAllSkills,
  createSkill,
  findSkillByName,
  assignSkillToStudent,
  getSkillsByStudent,
};
