const Numbers = (props) => {
  const { persons, search } = props;

  // filtered array created from search query
  const showPersons =
    search === ""
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(search.toLowerCase())
        );

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
