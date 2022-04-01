const Numbers = (props) => {
  const { showPersons } = props;

  return (
    <div>
      {showPersons.map((person) => (
        <div key={person.id}>
          {person.name} {person.number}
        </div>
      ))}
    </div>
  );
};

export default Numbers;
