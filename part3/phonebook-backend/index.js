// set up express app
const express = require("express");
const app = express();

// hard-coded contacts
const persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

// root
app.get("/", (req, res) => {
  res.send("Hello, world!");
});

// retrieve persons in json
app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/info", (req, res) => {
  const numPersons = persons.length;
  const currDate = new Date();

  res.send(
    `<div><p>Phonebook has info for ${numPersons} people.</p><p>${currDate}</p></div>`
  );
});

// set listening port
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});
