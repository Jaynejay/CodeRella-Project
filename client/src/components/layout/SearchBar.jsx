// src/components/SearchBar.jsx
import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [term, setTerm] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setTerm(value);
    onSearch(value); // Notify parent
  };

  return (
    <input
      type="text"
      value={term}
      onChange={handleChange}
      placeholder="Search by name, email or username..."
      className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
    />
  );
}
