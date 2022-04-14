// set up express app
const morgan = require("morgan");
const cors = require("cors");

const express = require("express");
const app = express();

// set listening port
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});

// allow cross-origin requests
app.use(cors());

// parses incoming request to json and stores in req.body
app.use(express.json());

// gets body of post request
morgan.token("post-body", (req, res) => {
  const bodySize = Object.keys(req.body).length;
  const postBody = bodySize ? JSON.stringify(req.body) : "";
  return postBody;
});

// morgan middleware
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :post-body"
  )
);

// serve static files from build
app.use(express.static("build"));

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

// generate ID
const randomID = () => {
  return Math.floor(Math.random() * 1000);
};

app.post("/api/persons", (req, res) => {
  // incoming content is parsed to json and stored in contactInfo
  const contactInfo = req.body;

  // check if name is in phonebook
  const inPhonebook = persons.find(
    (person) => person.name === contactInfo.name
  );

  // check content sent by user
  if (inPhonebook) {
    return res.status(400).json({ error: "name must be unique" });
  } else if (!contactInfo.number) {
    return res.status(400).json({ error: "number missing" });
  } else if (!contactInfo.name) {
    return res.status(400).json({ error: "name missing" });
  }

  // define properties of new person
  const person = {
    id: randomID(),
    name: contactInfo.name,
    number: contactInfo.number,
  };
  // update persons array with new contact
  persons = persons.concat(person);

  // send person as response
  res.json(person);
});

// retrieve app info
app.get("/info", (req, res) => {
  const numPersons = persons.length;
  const currDate = new Date();

  res.send(
    `<div><p>Phonebook has info for ${numPersons} people.</p><p>${currDate}</p></div>`
  );
});
