import { useState } from "react";
import Search from "./Search";
import Numbers from "./Numbers";
import PersonForm from "./PersonForm";

const App = () => {
  // state variables
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040 - 1234567", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");

  // handles form submission by adding input to persons and resetting newName
  const handleSubmit = (event) => {
    // prevents form submit
    event.preventDefault();

    // save newName in testString without whitespace
    const testString = newName.replace(/\s/g, "");

    // check if name is already in phone book (index returned if name exists)
    // removes whitespace to prevent duplicates
    const inArray = persons.findIndex(
      (person) => person.name.replace(/\s/g, "") === testString
    );
    inArray === -1
      ? addSetPersons({
          name: newName,
          number: newNumber,
          id: persons.length + 1,
        })
      : alert(`${newName} is already in phonebook`);

    // reset newName and newNumber
    setNewName("");
    setNewNumber("");
  };

  // handler to add values to persons state variable
  const addSetPersons = (name) => {
    // concat doesn't change existing array (no direct changes to state)
    setPersons(persons.concat(name));
  };

  const showPersons =
    search === ""
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(search.toLowerCase())
        );

  return (
    <div>
      <h2>Phonebook</h2>
      <Search search={search} setSearch={setSearch} />

      <h2>Add a new person</h2>
      <PersonForm
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        handleSubmit={handleSubmit}
      />

      <h2>Numbers</h2>
      <Numbers showPersons={showPersons} />
    </div>
  );
};

export default App;
