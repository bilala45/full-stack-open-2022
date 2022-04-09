import personServices from "../services/person";

const PersonForm = (props) => {
  const { newName, setNewName, newNumber, setNewNumber, persons, setPersons } =
    props;

  // handle setNewName
  const handleSetNewName = (event) => {
    setNewName(event.target.value);
  };

  // handle setNewNumber
  const handleSetNewNumber = (event) => {
    setNewNumber(event.target.value);
  };

  // handle form submission when new person is added to phonebook
  const handleSubmit = (event) => {
    // prevents form submit
    event.preventDefault();

    // create new person object
    const newContact = {
      name: newName,
      number: newNumber,
    };

    // finds index of user to determine if user is in phonebook
    const inPhonebook = verifyUser();

    // creates new contact for user or updates user with new phone number if contact already exists
    if (inPhonebook === -1) {
      personServices
        .createContact(newContact)
        .then((newPerson) => setPersons(persons.concat(newPerson)));
    } else {
      // updates contact phone number
      if (
        window.confirm(
          `${newName} is already in the phonebook. Do you want to replace their old number with a new one?`
        )
      ) {
        const contactId = persons[inPhonebook].id;

        personServices
          .updateNumber(contactId, newContact)
          .then((updatePerson) =>
            setPersons(
              persons.map((person) =>
                person.id !== contactId ? person : updatePerson
              )
            )
          );
      }
    }

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

  return (
    <form>
      {/* input tag for contact name */}
      <div>
        {/* input value given by newName state variable */}
        name: <input onChange={handleSetNewName} value={newName} />
      </div>
      <div>
        number: <input onChange={handleSetNewNumber} value={newNumber} />
      </div>
      <div>
        <button type="submit" onClick={handleSubmit}>
          add
        </button>
      </div>
    </form>
  );
};

export default PersonForm;
