import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ setResults }) => {
  const [input, setInput] = useState("");

  const fetchData = (value) => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((json) => {
        const results = json.filter((user) => {
          return (
            value &&
            user &&
            user.name &&
            user.name.toLowerCase().includes(value)
          );
        });
        // console.log(results);
        setResults(results)
      });
  };

  const handleChange = (value) => {
    setInput(value);
    fetchData(value);
  };

  return (
    <div className="bg-slate-200 w-full rounded-2xl h-10 dark:bg-slate-800  shadow-[#ddd] flex items-center">
      <FaSearch className="text-blue-500" id="search-icon" />
      <input
        className="transparent bg-slate-200 dark:bg-slate-800 dark:text-slate-100 border-none h-full font-medium ml-1 focus:outline-none w-full rounded-2xl"
        placeholder="type to search ..."
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
