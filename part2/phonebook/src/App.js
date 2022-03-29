import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  // controls form input element
  const [newName, setNewName] = useState("");

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
      ? addSetPersons({ name: newName })
      : alert(`${newName} is already in phonebook`);
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
