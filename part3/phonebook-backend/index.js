// set up express app
const express = require("express");
const app = express();

// hard-coded contacts
let persons = [
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

// retrieve individual person in phonebook
app.get("/api/persons/:id", (req, res) => {
  // extract id from route
  const reqID = Number(req.params.id);
  // find person in phonebook with matching id
  const person = persons.find((person) => person.id === reqID);
  // return person if matching id found, 404 otherwise
  person ? res.json(person) : res.status(404).end();
});

// delete phonebook entry
app.delete("/api/persons/:id", (req, res) => {
  // extract id from route
  const reqID = Number(req.params.id);
  // filter persons array to remove person with matching id
  persons = persons.filter((person) => person.id !== reqID);
  // send back 204 status to signal completed action
  res.status(204).end();
});

// retrieve app info
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
