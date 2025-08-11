const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
  // Get token from header: "Authorization: Bearer <token>"
  const token = req.header("Authorization")?.replace("Bearer ", "");

  // If no token, deny access
  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;  // Attach user ID to request
    next(); // Proceed to the next function
  } catch (err) {
    res.status(401).json({ message: "Token is not valid" });
  }
}

module.exports = authMiddleware;