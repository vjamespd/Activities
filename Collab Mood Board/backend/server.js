const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB Atlas
mongoose.connect(
  "mongodb+srv://dbUser:admin@cluster0.ny203.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
)
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Failed to connect to MongoDB:', err));

// Define Mood schema and model
const moodSchema = new mongoose.Schema({
  imageURL: String,
  caption: String,
});

const Mood = mongoose.model("Mood", moodSchema);

// Routes
app.post("/api/moods", async (req, res) => {
  const newMood = new Mood(req.body);
  await newMood.save();
  res.status(201).send(newMood);
});

app.get("/api/moods", async (req, res) => {
  const moods = await Mood.find();
  res.status(200).send(moods);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
