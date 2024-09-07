import React, { useState, useRef } from "react";
import { useQuery,useInfiniteQuery } from "@tanstack/react-query";
import ListCard from "../components/ListCard";
import sliceFive from "../utils/sliceFive";
import {
  loadApiData,
  loadApiDataWithFilters,
  fetchConfiguration,
} from "../api/mediaSearchApi";

const Movie = () => {
  const [query, setQuery] = useState("");
  const [filtersSelected, setFiltersSelected] = useState(4);
  const [shouldFetch, setShouldFetch] = useState(false);
  const inputRef = useRef(null);
  const filters = ["popular", "now_playing", "upcoming", "top_rated"];

  const {
    data: config,
    isLoading: isLoadingConfig,
    error: errorConfig,
  } = useQuery({
    queryKey: ["configuration"],
    queryFn: fetchConfiguration,
    select: (data) => ({
      imageUrl: data.images.base_url + data.images.backdrop_sizes[0],
    }),
  });

  const {
    data: movieArray,
    isLoading: isLoadingMovies,
    error: errorMovies,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useInfiniteQuery({
    queryKey: ["movies", query, filters[filtersSelected]],
    queryFn: ({ pageParam = 1 }) => {
      if (query) {
        return loadApiData({ queryKey: ["movieArray", query, pageParam] });
      } else {
        return loadApiDataWithFilters({
          queryKey: ["movieArray", filters[filtersSelected], pageParam],
        });
      }
    },
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined;
    },
    enabled: shouldFetch,
    keepPreviousData: true,
  });
  
  const loadMoreMovies = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const handleFilters = (e) => {

    setQuery("");
    setShouldFetch(true);
    switch (e.target.id) {
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

  if (isLoadingMovies || isLoadingConfig) {
    return <div>Loading...</div>;
  }

  if (errorMovies || errorConfig) {
    return (
      <div>
        Error occurred:{" "}
        {errorMovies ? errorMovies.message : errorConfig.message}
      </div>
    );
  }
  const allMovies = movieArray?.pages.flatMap((page) => page.results) ?? [];
  const slicedMovies = sliceFive(allMovies);

  return (
    <div>
      <div className="search">
        <form className="d-flex w-35" role="search" onSubmit={handleSubmit}>
          <input
            className="form-control me-2"
            ref={inputRef}
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button className="btn btn-primary" type="submit">
            <i className="fas fa-search"></i>
          </button>
        </form>
      </div>

      <div className="filters">
        <input
          onClick={handleFilters}
          type="radio"
          className="btn-check"
          name="options"
          id="option1"
          autoComplete="off"
        />
        <label className="btn btn-secondary" htmlFor="option1">
          Popularité
        </label>

        <input
          onClick={handleFilters}
          type="radio"
          className="btn-check"
          name="options"
          id="option2"
          autoComplete="off"
        />
        <label className="btn btn-secondary" htmlFor="option2">
          Du moment
        </label>

        <input
          onClick={handleFilters}
          type="radio"
          className="btn-check"
          name="options"
          id="option3"
          autoComplete="off"
        />
        <label className="btn btn-secondary" htmlFor="option3">
          à venir
        </label>

        <input
          onClick={handleFilters}
          type="radio"
          className="btn-check"
          name="options"
          id="option4"
          autoComplete="off"
        />
        <label className="btn btn-secondary" htmlFor="option4">
          Les mieux notés
        </label>
      </div>

      {slicedMovies && slicedMovies.length > 0 && (
        <div className="movie-list container">
          <div className="row row-cols-1 row-cols-sm-3 row-cols-md-4 row-cols-lg-5">
            {slicedMovies.map((movieList, index) => (
              <ListCard
                key={index}
                mediaList={movieList}
                media={"movie"}
                imageUrl={config.imageUrl}
              />
            ))}
          </div>
        </div>
      )}
      {hasNextPage && (
        <div className="d-flex justify-content-center my-4">
          <button
            className="btn btn-primary"
            onClick={loadMoreMovies}
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                Chargement...
              </>
            ) : (
              "Charger plus de films"
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default Movie;
