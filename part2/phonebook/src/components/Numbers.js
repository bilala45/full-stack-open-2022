import personServices from "../services/person";

const Numbers = (props) => {
  const { persons, search, setPersons, setStatus } = props;

  // filtered array created from search query
  const showPersons =
    search === ""
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(search.toLowerCase())
        );

  // deletes user from phonebook
  const handleDelete = (id) => {
    // should this be showPersons?
    const associatedUser = persons.find((person) => person.id === id);
    const message = `Delete ${associatedUser.name} from phonebook?`;
    const baseURL = "http://localhost:3001/persons";

    // deletes user if user presses ok
    if (window.confirm(message)) {
      personServices.deleteContact(id);
      // passes new persons array with elements that don't match id
      setPersons(persons.filter((person) => person.id !== id));
      setStatus(`${associatedUser.name} was deleted`);
      setTimeout(() => {
        setStatus("");
      }, 3000);
    }
  };

  return (
    <div>
      {showPersons.map((person) => (
        <div key={person.id}>
          {person.name} {person.number}
          <button onClick={() => handleDelete(person.id)}>delete</button>
        </div>
      ))}
    </div>
  );
};

export default Numbers;
