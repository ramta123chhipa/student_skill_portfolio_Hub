const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  // Token is usually sent in header → Authorization: Bearer <token>
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    // decode token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // attach user info from token to req.user
    req.user = {
      id: decoded.id,
      role: decoded.role,
    };

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = authMiddleware;









































