require("dotenv").config();
const express = require("express");
const Note = require("./models/note.js");
const app = express();

app.use(express.json());
app.use(express.static("dist"));

let notes = [];

app.get("/api/notes", (req, res) => {
  Note.find({}).then((notes) => {
    res.json(notes);
  });
});

app.get("/api/notes/:id", (req, res) => {
  const id = req.params.id;
  Note.findById(id).then((note) => {
    res.json(note);
  });
});

app.delete("/api/notes/:id", (req, res) => {
  const id = req.params.id;
  notes = notes.filter((item) => item.id !== id);
  res.status(204).end();
});

app.post("/api/notes", (req, res) => {
  const body = req.body;
  if (!body.content) {
    return res.status(400).json({ error: "content missing" });
  }
  const note = new Note({
    content: body.content,
    important: body.important || false,
  });
  note.save().then((savedNote) => {
    res.json(savedNote);
  });
});

const unknownEndpoint = (req, res) => {
  res.status(404).json({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
