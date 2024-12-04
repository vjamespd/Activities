const express = require('express');
const router = express.Router();
const Mood = require('../models/Mood');

// Fetch all moods
router.get('/api/moods', async (req, res) => {
  try {
    const moods = await Mood.find();
    res.status(200).json(moods);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new mood
router.post('/api/moods', async (req, res) => {
  const { imageURL, caption } = req.body;

  const newMood = new Mood({
    imageURL,
    caption,
  });

  try {
    const savedMood = await newMood.save();
    res.status(201).json(savedMood);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
