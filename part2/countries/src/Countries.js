import SingleCountry from "./SingleCountry";

const Countries = (props) => {
  const { filtered, query, setQuery } = props;

  // only renders if there is a query value
  if (query) {
    // condition for too many matches to query
    if (filtered.length > 10) {
      return <div>Too many matches, specify another filter</div>;
    }
    // condition for multiple matches to query (1+)
    else if (filtered.length > 1) {
      return (
        <div>
          {filtered.map((country) => (
            <div key={country.name.common}>
              {country.name.common}
              {/* updates query with name of country pressed */}
              <button
                onClick={() => setQuery(country.name.common.toLowerCase())}
              >
                show
              </button>
            </div>
          ))}
        </div>
      );
      // condition for single match to query
    } else if (filtered.length === 1) {
      return <SingleCountry match={filtered[0]} />;
      // condition for no matches to query
    } else {
      return <div>No matches found</div>;
    }
  }
};

export default Countries;
