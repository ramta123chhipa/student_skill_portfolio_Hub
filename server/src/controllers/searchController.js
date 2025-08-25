const pool = require("../config/db");

// Search students by skill, branch, year
const searchStudents = async (req, res) => {
  try {
    const { skill, branch, year } = req.query;

    let query = `
      SELECT u.id, u.username, u.email, p.full_name, p.branch, p.year,
             array_agg(s.name) AS skills
      FROM users u
      JOIN profiles p ON u.id = p.user_id
      LEFT JOIN student_skills ss ON u.id = ss.student_id
      LEFT JOIN skills s ON ss.skill_id = s.id
    `;
    
    let conditions = [];
    let values = [];
    let i = 1;

    if (skill) {
      conditions.push(`s.name ILIKE $${i++}`);
      values.push(`%${skill}%`);
    }
    if (branch) {
      conditions.push(`p.branch ILIKE $${i++}`);
      values.push(`%${branch}%`);
    }
    if (year) {
      conditions.push(`p.year = $${i++}`);
      values.push(year);
    }

    if (conditions.length > 0) {
      query += " WHERE " + conditions.join(" AND ");
    }

    query += `
      GROUP BY u.id, p.full_name, p.branch, p.year
    `;

    const { rows } = await pool.query(query, values);

    res.json(rows);
  } catch (err) {
    console.error("❌ Search error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { searchStudents };
