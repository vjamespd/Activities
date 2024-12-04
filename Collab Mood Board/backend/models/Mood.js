const mongoose = require('mongoose');

const moodSchema = new mongoose.Schema({
  imageURL: { type: String, required: true },
  caption: { type: String, required: true },
});

const Mood = mongoose.model('Mood', moodSchema);

module.exports = Mood;
