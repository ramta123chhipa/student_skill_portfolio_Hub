const bcrypt = require("bcryptjs");
const pool = require("../config/db");
const generateToken = require("../utils/generateToken");
const { registerSchema, loginSchema } = require("../utils/validator");

const register = async (req, res, next) => {
  try {
    // Validate request
    const { error } = registerSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const { username, email, password } = req.body;

    // check if user exists
    const userExists = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (userExists.rows.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // insert new user with default role 'student'
    const { rows } = await pool.query(
      `INSERT INTO users (username, email, password, role) 
       VALUES ($1, $2, $3, $4) 
       RETURNING id, username, email, role, created_at`,
      [username, email, hashedPassword, "student"]
    );

    const user = rows[0];
    const token = generateToken(user);

    res.status(201).json({
      success: true,
      token,
      user,
    });
  } catch (error) {
    next(error);
  }
};


// ✅ Login user
const login = async (req, res, next) => {
  try {
    // Validate request
    const { error } = loginSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const { email, password } = req.body;

    const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    const user = rows[0];

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user);

    res.json({
      success: true,
      token,
      user: { id: user.id, username: user.username, email: user.email, role: user.role },
    });
  } catch (error) {
    next(error);
  }
};

// ✅ Google OAuth callback (after Passport auth)
const googleAuthCallback = (req, res, next) => {
  try {
    const user = req.user; // passport gives user
    if (!user) return res.status(400).json({ message: "Google authentication failed" });

    const token = generateToken(user);

    // In production: redirect with token to frontend
    res.json({
      success: true,
      token,
      user: { id: user.id, username: user.username, email: user.email, role: user.role },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login,googleAuthCallback};
