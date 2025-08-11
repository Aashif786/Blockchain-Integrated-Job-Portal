const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const Profile = require("../models/Profile");

const router = express.Router();

// POST /api/profile — Create or Update Profile
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { bio, skills, linkedin, walletAddress } = req.body;

    let profile = await Profile.findOne({ user: req.user.id });

    if (profile) {
      // Update existing profile
      profile.bio = bio;
      profile.skills = skills;
      profile.linkedin = linkedin;
      profile.walletAddress = walletAddress;
      await profile.save();
    } else {
      // Create new profile
      profile = new Profile({
        user: req.user.id,
        bio,
        skills,
        linkedin,
        walletAddress,
      });
      await profile.save();
    }

    res.json(profile);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// GET /api/profile/:userId — Get Profile by User ID
router.get("/:userId", async (req, res) => {
  try {
    const profile = await Profile
      .findOne({ user: req.params.userId })
      .populate("user", "name email");

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;