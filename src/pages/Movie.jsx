import React, { useState, useRef } from "react";
import Search from "../components/Search";
import FiltersMedia from "../components/FiltersMedia";
import SearchResult from "../components/SearchResult";

const Movie = () => {
  const [query, setQuery] = useState("");
  const [filtersSelected, setFiltersSelected] = useState(4);
  const [shouldFetch, setShouldFetch] = useState(false);
  const inputRef = useRef(null);
  const filters = ["popular", "now_playing", "upcoming", "top_rated"];



  const handleFilters = (e,filterId) => {
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
      <Search handleSubmit={handleSubmit} inputRef={inputRef} media={"movie"}/>

      <FiltersMedia handleFilters={handleFilters} media={"movie"}/>

      <SearchResult shouldFetch={shouldFetch} query={query} filters={filters} filtersSelected={filtersSelected} media={"movie"} />
    </div>
  );
};

export default Movie;
