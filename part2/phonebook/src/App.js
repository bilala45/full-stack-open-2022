import { useState, useEffect } from "react";
import Search from "./components/Search";
import Numbers from "./components/Numbers";
import PersonForm from "./components/PersonForm";
import personServices from "./services/person";

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

  // retrieve initial data
  useEffect(() => {
    personServices
      .get()
      .then((initialData) => setPersons(initialData))
      .catch((error) => console.log("Error fetching resource."));
  }, []);

  // handle form submission when new person is added to phonebook
  const handleSubmit = (event) => {
    // prevents form submit
    event.preventDefault();

    // create new person object
    const newContact = {
      name: newName,
      number: newNumber,
    };

    // checks if user is already in phonebook
    const inPhonebook = verifyUser();

    // posts newContact if user is not in phonebook, displays alert otherwise
    inPhonebook === -1
      ? personServices
          .create(newContact)
          .then((newPerson) => setPersons(persons.concat(newPerson)))
          .catch((error) => console.log("post error"))
      : alert(`${newName} is already in phonebook`);

    // reset newName and newNumber
    setNewName("");
    setNewNumber("");
  };

  // verify name is not in phonebook
  const verifyUser = () => {
    // save newName in testString without whitespace
    const testString = newName.replace(/\s/g, "");

    // check if name is already in phone book (index returned if name exists)
    // removes whitespace to prevent duplicates
    const phonebookIndex = persons.findIndex(
      (person) => person.name.replace(/\s/g, "") === testString
    );

    // returns -1 if user is not in phonebook, index otherwise
    return phonebookIndex;
  };

  // filtered array created from search query
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
        handleSetNewNumber={handleSetNewNumber}
        handleSubmit={handleSubmit}
      />

      <h2>Numbers</h2>
      <Numbers showPersons={showPersons} />
    </div>
  );
};

export default App;
