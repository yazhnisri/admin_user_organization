const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;
const authMiddleware = (req, res, next) => {
  // Check if Authorization header is present
  const authHeader = req.header("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  // Verify JWT token
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }

    // Add user object to request for future use
    req.user = decoded;
    next();
  });
};

module.exports = authMiddleware;
