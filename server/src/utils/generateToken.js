const jwt = require("jsonwebtoken");

/**
 * Generate JWT token
 * @param {Object} user - user object (must include id and role)
 * @returns {string} JWT token
 */
const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
};

module.exports = generateToken;
