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

  return (
    <>
      <form>
        find countries:{" "}
        <input
          onChange={(event) => setQuery(event.target.value)}
          value={query}
        />
      </form>
      <Countries countries={countries} query={query} />
    </>
  );
};

export default App;
