const PersonForm = (props) => {
  const { newName, setNewName, newNumber, setNewNumber, handleSubmit } = props;

  return (
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
        number:{" "}
        <input
          onChange={(event) => setNewNumber(event.target.value)}
          value={newNumber}
        />
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
