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

  // retrieve initial data
  useEffect(() => {
    personServices.getAll().then((initialData) => setPersons(initialData));
  }, []);

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
        persons={persons}
        setPersons={setPersons}
      />

      <h2>Numbers</h2>
      <Numbers persons={persons} search={search} setPersons={setPersons} />
    </div>
  );
};

export default App;
