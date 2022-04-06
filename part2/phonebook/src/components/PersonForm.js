const PersonForm = (props) => {
  const {
    newName,
    handleSetNewName,
    newNumber,
    handleSetNewNumber,
    handleSubmit,
  } = props;

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
