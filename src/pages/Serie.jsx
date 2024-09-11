import React, { useState, useRef } from "react";
import Search from "../components/Search";
import FiltersMedia from "../components/FiltersMedia";
import SearchResult from "../components/SearchResult";

const Serie = () => {
  const [query, setQuery] = useState("");
  const [filtersSelected, setFiltersSelected] = useState(4);
  const [shouldFetch, setShouldFetch] = useState(false);
  const inputRef = useRef(null);
  const filters = ["airing_today", "on_the_air", "popular", "top_rated"];
  
  const handleFilters = (e, filterId) => {
    setQuery("");
    setShouldFetch(true);
    switch (filterId) {
      case "option1":
        setFiltersSelected(0);
        break;
      case "option2":
        setFiltersSelected(1);
        break;
      case "option3":
        setFiltersSelected(2);
        break;
      case "option4":
        setFiltersSelected(3);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFiltersSelected(4);
    setQuery(inputRef.current.value);
    setShouldFetch(true);
  };

  return (
    <div>
      <Search handleSubmit={handleSubmit} inputRef={inputRef} media={"tv"} />
      <FiltersMedia handleFilters={handleFilters} media={"tv"} />

      <SearchResult
        shouldFetch={shouldFetch}
        query={query}
        filters={filters}
        filtersSelected={filtersSelected}
        media={"tv"}
      />
    </div>
  );
};

export default Serie;
