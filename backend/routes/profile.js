const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// GET /api/profile — Test protected route
router.get("/", authMiddleware, (req, res) => {
  res.json({
    message: "Welcome to your profile",
    userId: req.user.id,
  });
});

module.exports = router;