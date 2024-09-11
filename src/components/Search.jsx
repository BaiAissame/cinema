import React from "react";

const Search = ({ handleSubmit, inputRef, media }) => {
  return (
    <div className="search">
      <form className="d-flex w-50" role="search" onSubmit={handleSubmit}>
        <input
          className="form-control me-2"
          ref={inputRef}
          type="search"
          placeholder={
            media === "movie"
              ? "Rechercher un film"
              : media === "tv"
              ? "Rechercher une série"
              : "Rechercher un artiste"
          }
          aria-label="Search"
        />
        <button className="btn search-button" type="submit">
          <i className="fas fa-search"></i>
        </button>
      </form>
    </div>
  );
};

export default Search;
