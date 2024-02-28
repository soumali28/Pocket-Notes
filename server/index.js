const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect("mongodb+srv://debbaner1:Nanami@sociogram.ysjxit0.mongodb.net/", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

const colorClassMapping = {
  "#B38BFA": "error",
  "#FF79F2": "error-content",
  "#43E6FC": "warning",
  "#F19576": "warning-content",
  "#0047FF": "success",
  "#6691FF": "success-content",
};

// Define MongoDB schemas and models
const groupSchema = new mongoose.Schema({
  name: String,
  color: String,
});

const noteSchema = new mongoose.Schema({
  groupId: mongoose.Schema.Types.ObjectId,
  text: String,
  date: String,
});

const Group = mongoose.model("Group", groupSchema);
const Note = mongoose.model("Note", noteSchema);

// REST API endpoints
app.get("/groups", async (req, res) => {
  const groups = await Group.find();
  res.json(groups);
});

app.post("/groups", async (req, res) => {
  try {
    const { name, color } = req.body;

    // Map color to its corresponding class name
    const mappedColor = colorClassMapping[color] || color;

    const newGroup = new Group({ name, color: mappedColor });
    await newGroup.save();
    res.json(newGroup);
  } catch (error) {
    console.error("Error creating group:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/groups/:groupId", async (req, res) => {
  const groupId = req.params.groupId;
  const groupNotes = await Note.find({ groupId });
  res.json(groupNotes);
});

app.post("/groups/:groupId", async (req, res) => {
  const groupId = req.params.groupId;
  const { text, date } = req.body;
  const newNote = new Note({ groupId, text, date });
  await newNote.save();
  res.json(newNote);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
