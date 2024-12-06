const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://dbUser:admin@cluster0.ny203.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err.message));

// Define User and Tweet models
const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  })
);

const Tweet = mongoose.model(
  "Tweet",
  new mongoose.Schema({
    content: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  })
);

// Authentication Middleware
const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, "your_secret__key", (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Register
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already taken" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    const token = jwt.sign(
      { id: newUser._id, username: newUser.username },
      "your_secret__key",
      { expiresIn: "1h" }
    );
    res.status(201).json({ message: "User registered successfully", token });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error registering user", error: err.message });
  }
});

// Login
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username },
      "your_secret__key",
      { expiresIn: "1h" }
    );
    console.log('Login successful, userId:', user._id); // Log the userId
    console.log('Sending response:', { message: 'Login successful', token, userId: user._id });
    res
      .status(200)
      .json({ message: "Login successful", token, userId: user._id });
  } catch (err) {
    res.status(500).json({ message: "Error logging in", error: err.message });
  }
});

// Fetch Tweets
app.get('/tweets', authenticateToken, async (req, res) => {
    try {
      const tweets = await Tweet.find().populate('user'); // Populate user details
      res.status(200).json(tweets);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching tweets', error: err.message });
    }
  });
  

// Create Tweet
app.post("/tweets", authenticateToken, async (req, res) => {
  const { content } = req.body;
  try {
    const tweet = new Tweet({ content, user: req.user.id });
    await tweet.save();
    res.status(201).json(tweet);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating tweet", error: err.message });
  }
});

// Edit Tweet
app.put("/tweets/:id", authenticateToken, async (req, res) => {
  const { content } = req.body;
  const tweetId = req.params.id;
  try {
    const tweet = await Tweet.findById(tweetId);
    if (!tweet) {
      return res.status(404).json({ message: "Tweet not found" });
    }

    if (tweet.user.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "You can only edit your own tweets" });
    }
    tweet.content = content;
    await tweet.save();
    res.status(200).json(tweet);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error editing tweet", error: err.message });
  }
});

// Delete Tweet
app.delete("/tweets/:id", authenticateToken, async (req, res) => {
  const tweetId = req.params.id;
  try {
    const tweet = await Tweet.findById(tweetId);
    if (!tweet) {
      return res.status(404).json({ message: "Tweet not found" });
    }

    if (tweet.user.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "You can only delete your own tweets" });
    }
    await tweet.remove();
    res.status(200).json({ message: "Tweet deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting tweet", error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
