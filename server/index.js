const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

let groups = [];
let notes = [];

// Get all groups
app.get("/groups", (req, res) => {
  res.json(groups);
});

// Create a new group
app.post("/groups", (req, res) => {
  const { name } = req.body;
  const newGroup = { id: groups.length + 1, name };
  groups.push(newGroup);
  res.json(newGroup);
});

// Get all notes in a specific group
app.get("/groups/:groupId/notes", (req, res) => {
  const groupId = parseInt(req.params.groupId);
  const groupNotes = notes.filter((note) => note.groupId === groupId);
  res.json(groupNotes);
});

// Create a new note in a specific group
app.post("/groups/:groupId/notes", (req, res) => {
  const groupId = parseInt(req.params.groupId);
  const { text } = req.body;
  const newNote = { id: notes.length + 1, groupId, text };
  notes.push(newNote);
  res.json(newNote);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
