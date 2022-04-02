import { useState, useEffect } from "react";
import axios from "axios";
import Countries from "./Countries";

const App = () => {
  // stores country query
  const [query, setQuery] = useState("");
  // stores country data retrieved from restcountries api
  const [countries, setCountries] = useState([]);

  // request for countries data
  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => setCountries(response.data))
      .catch(() => console.log("error"));
  }, []);

  // handles input to search field by setting query
  const handleQueryChange = (event) => {
    // prevents reload of page on submit
    event.preventDefault();
    setQuery(event.target.value);
  };

  const filtered = query
    ? countries.filter((country) =>
        country.name.common.toLowerCase().includes(query)
      )
    : countries;

  return (
    <>
      <form>
        find countries: <input onChange={handleQueryChange} value={query} />
      </form>
      <Countries filtered={filtered} query={query} setQuery={setQuery} />
    </>
  );
};

export default App;
