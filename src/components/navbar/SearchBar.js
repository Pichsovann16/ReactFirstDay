export default function SearchBar({ value, onChange }) {
  return (
    <label className="searchBar">
      <span className="searchBar__label">Search</span>
      <input
        className="searchBar__input"
        type="text"
        placeholder="Type a movie title..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete="off"
      />
    </label>
  );
}
