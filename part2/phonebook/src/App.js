import { useState, useEffect } from "react";
import Search from "./components/Search";
import Numbers from "./components/Numbers";
import PersonForm from "./components/PersonForm";
import personServices from "./services/person";
import Notification from "./components/Notification";

const App = () => {
  // state variables
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  // retrieve initial data
  useEffect(() => {
    personServices.getAll().then((initialData) => setPersons(initialData));
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification status={status} />
      <Search search={search} setSearch={setSearch} />

      <h2>Add a new person</h2>
      <PersonForm
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        persons={persons}
        setPersons={setPersons}
        setStatus={setStatus}
      />

      <h2>Numbers</h2>
      <Numbers
        persons={persons}
        search={search}
        setPersons={setPersons}
        setStatus={setStatus}
      />
    </div>
  );
};

export default App;
