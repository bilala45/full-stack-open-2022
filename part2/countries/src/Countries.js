import SingleCountry from "./SingleCountry";

const Countries = (props) => {
  const { countries, query } = props;

  // filters country names based on query value
  const match = countries.filter((country) =>
    country.name.common.toLowerCase().includes(query)
  );

  // conditional rendering of components if query exists
  if (query.length != 0) {
    // handles too many matches to query
    if (match.length > 10) {
      return <div>Too many matches, specify another filter</div>;

      // displays matches on screen
    } else if (match.length > 1) {
      return (
        <div>
          {match.map((country) => (
            <div key={country.name.common}>{country.name.common}</div>
          ))}
        </div>
      );

      // handles match found
    } else if (match.length == 1) {
      return <SingleCountry match={match} />;

      // handles no matches
    } else {
      return <div>No matches found.</div>;
    }
  }
};

export default Countries;
