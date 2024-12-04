import React from "react";
import SearchResult from "./SearchResult";

const SearchresultList = ({ results }) => {
  return (
    <div className="w-full bg-white flex flex-col shadow-xl rounded-lg mt-4 max-h-72 overflow-y-scroll dark:bg-slate-800 dark:text-slate-100">
      {results.map((result, id) => {
        return <SearchResult result={result} key={id} />;
      })}
    </div>
  );
};

export default SearchresultList;
