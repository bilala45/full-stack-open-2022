const SingleCountry = ({ match }) => {
  // extracts values from languages object
  const languages = Object.values(match.languages);

  return (
    <div>
      <h1>{match.name.common}</h1>

      <div>capital: {match.capital}</div>
      <div>area: {match.area}</div>

      <h3>languages:</h3>
      <ul>
        {languages.map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>

      <img src={match.flags.png} alt={"country's flag"} />
    </div>
  );
};

export default SingleCountry;
