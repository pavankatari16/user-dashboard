export default function SearchBar({ value, onChange }) {
  return (
    <div className="search">
      <label className="searchLabel" htmlFor="userSearch">
        Search
      </label>
      <input
        id="userSearch"
        className="searchInput"
        type="search"
        value={value}
        placeholder="Search by name or email"
        onChange={(e) => onChange(e.target.value)}
        autoComplete="off"
        aria-label="Search users by name or email"
      />
    </div>
  )
}

