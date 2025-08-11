const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const Job = require("../models/Job");

const router = express.Router();

// Post Job
router.post("/", authMiddleware, async (req, res) => {
  const { title, description, skills, budget } = req.body;
  try {
    const job = new Job({ title, description, skills, budget, postedBy: req.user.id });
    await job.save();
    res.status(201).json(job);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get All Jobs
router.get("/", async (req, res) => {
  try {
    const jobs = await Job.find().populate("postedBy", "name");
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;