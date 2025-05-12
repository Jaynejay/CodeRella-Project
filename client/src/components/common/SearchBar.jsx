
const SearchBar = ({ placeholder = "Search...", onSearch }) => {
  return (
    <div className="flex items-center gap-2 mb-4">
      <input
        type="text"
        placeholder={placeholder}
        onChange={(e) => onSearch(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
      />
    </div>
  );
};

export default SearchBar;
