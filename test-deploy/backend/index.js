const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();

// register port that server is listening on
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// logging
app.use(morgan("tiny"));

// allow cross-origin requests
app.use(cors());

// parses incoming json requests and puts parsed data in req.body
app.use(express.json());

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    date: "2022-05-30T17:30:31.098Z",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only Javascript",
    date: "2022-05-30T18:39:34.091Z",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    date: "2022-05-30T19:20:14.298Z",
    important: true,
  },
];

// get request for notes
app.get("/api/notes", (req, res) => {
  res.json(notes);
});

// get request for individual note resources
app.get("/api/notes/:id", (req, res) => {
  const id = Number(req.params.id);
  const note = notes.find((note) => id === note.id);
  note ? res.json(note) : res.status(404).end();
});

// delete request for individual note resources
app.delete("/api/notes/:id", (req, res) => {
  const id = Number(req.params.id);
  notes = notes.filter((note) => id !== note.id);
  res.status(204).end();
});

// generate ID for notes
const generateID = () => {
  // Map generates an array of the note's IDs
  // Math.max doesn't accept an array of values so we use the spread operator to split the array of ID's into its constituent values
  const maxId =
    notes.length > 0 ? Math.max(...notes.map((note) => note.id)) + 1 : 0;
  return maxId;
};

// post request for new note
app.post("/api/notes", (req, res) => {
  const body = req.body;

  // check if body contains any content
  // we need to return from the function if there is no content or our function will continue executing
  if (!body.content) {
    return res.status(400).json({ error: "content missing" });
  }

  // set content and important based on body passed in
  // set date to current date and id using generateID function
  const note = {
    // this is the main thing that needs to be specified in our note
    content: body.content,
    // if important is not specified, important will default to false
    important: body.important || false,
    date: new Date(),
    id: generateID(),
  };

  // add POSTed note to notes array
  notes = notes.concat(note);

  // sends a JSON response (converts note to JSON using JSON.stringify() method)
  res.json(note);
});

// catch all for unrecognized routes
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);
