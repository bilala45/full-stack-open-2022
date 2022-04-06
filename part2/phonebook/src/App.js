import { useState, useEffect } from "react";
import Search from "./components/Search";
import Numbers from "./components/Numbers";
import PersonForm from "./components/PersonForm";
import axios from "axios";

const App = () => {
  // state variables
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");

  // handle setNewName
  const handleSetNewName = (event) => {
    setNewName(event.target.value);
  };

  // handle setNewNumber
  const handleSetNewNumber = (event) => {
    setNewNumber(event.target.value);
  };

  // retrieve data from db.json
  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then((response) => setPersons(response.data))
      .catch(() => console.log("Error fetching resource."));
  }, []);

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
        handleSetNewName={handleSetNewName}
        newNumber={newNumber}
        setNewNumber={handleSetNewNumber}
        handleSubmit={handleSubmit}
      />

      <h2>Numbers</h2>
      <Numbers showPersons={showPersons} />
    </div>
  );
};

export default App;
