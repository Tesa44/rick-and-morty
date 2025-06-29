export default function Search({ query, setQuery }) {
  return (
    <input
      className="search"
      type="text"
      placeholder="Search characters..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    ></input>
  );
}
