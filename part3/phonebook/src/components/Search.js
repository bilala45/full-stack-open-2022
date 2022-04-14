const Search = (props) => {
  const { search, setSearch } = props;

  // handles updates to search state
  const handleSetSearch = (event) => {
    setSearch(event.target.value);
  };

  return (
    <form>
      <div>
        search: <input onChange={handleSetSearch} value={search} />
      </div>
    </form>
  );
};

export default Search;
