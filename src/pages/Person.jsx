import React, { useState, useRef } from "react";
import Search from "../components/Search";
import SearchResultPerson from "../components/SearchResultPerson";

const Person = () => {
  const [query, setQuery] = useState("");
  const [shouldFetch, setShouldFetch] = useState(false);
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setQuery(inputRef.current.value);
    setShouldFetch(true);
  };

  return (
    <div>
      <Search handleSubmit={handleSubmit} inputRef={inputRef} media={"person"} />

      <SearchResultPerson
        shouldFetch={shouldFetch}
        query={query}
      />
    </div>
  );
};

export default Person;
