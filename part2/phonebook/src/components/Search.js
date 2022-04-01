const Search = (props) => {
  const { search, setSearch } = props;

  return (
    <form>
      <div>
        search:{" "}
        <input
          onChange={(event) => setSearch(event.target.value)}
          value={search}
        />
      </div>
    </form>
  );
};

export default Search;
