import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  // controls form input element
  const [newName, setNewName] = useState("");

  // handles form submission by adding input to persons and resetting newName
  const handleSubmit = (event) => {
    // prevents form submit
    event.preventDefault();
    addSetPersons({ name: newName });
    // reset newName
    setNewName("");
  };

  // handler to add values to persons state variable
  const addSetPersons = (name) => {
    // concat doesn't change existing array (no direct changes to state)
    setPersons(persons.concat(name));
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        {/* input tag for contact name */}
        <div>
          {/* input value given by newName state variable */}
          name:{" "}
          <input
            onChange={(event) => setNewName(event.target.value)}
            value={newName}
          />
        </div>
        <div>
          <button type="submit" onClick={handleSubmit}>
            add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      {/* maps persons array and prints name */}
      {persons.map((person) => (
        <div key={person.name}>{person.name}</div>
      ))}
    </div>
  );
};

export default App;
