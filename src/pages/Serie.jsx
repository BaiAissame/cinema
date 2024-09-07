import React, { useState, useRef } from "react";
import { useQuery,useInfiniteQuery } from "@tanstack/react-query";
import ListCard from "../components/ListCard";
import sliceFive from "../utils/sliceFive";
import {
  loadApiData,
  loadApiDataWithFilters,
} from "../api/serieSearchApi";
import fetchConfiguration from "../api/fetchConfiguration";

const Serie = () => {
  const [query, setQuery] = useState("");
  const [filtersSelected, setFiltersSelected] = useState(4);
  const [shouldFetch, setShouldFetch] = useState(false);
  const inputRef = useRef(null);
  const filters = ["airing_today", "on_the_air", "popular", "top_rated"];

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
    data: serieArray,
    isLoading: isLoadingSerie,
    error: errorSerie,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useInfiniteQuery({
    queryKey: ["serie", query, filters[filtersSelected]],
    queryFn: ({ pageParam = 1 }) => {
      if (query) {
        return loadApiData({ queryKey: ["serieArray", query, pageParam] });
      } else {
        return loadApiDataWithFilters({
          queryKey: ["serieArray", filters[filtersSelected], pageParam],
        });
      }
    },
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined;
    },
    enabled: shouldFetch,
    keepPreviousData: true,
  });
  
  const loadMoreSeries = () => {
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

  if (isLoadingSerie || isLoadingConfig) {
    return null;
  }

  if (errorSerie || errorConfig) {
    return (
      <div>
        Error occurred:{" "}
        {errorSerie ? errorSerie.message : errorConfig.message}
      </div>
    );
  }
  const allSeries = serieArray?.pages.flatMap((page) => page.results) ?? [];
  const slicedSeries = sliceFive(allSeries);

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
        Diffusées aujourd'hui
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
          En cours de diffusion
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
        Populaires
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
        Les mieux évaluées
        </label>
      </div>

      {slicedSeries && slicedSeries.length > 0 && (
        <div className="container">
          <div className="row row-cols-1 row-cols-sm-3 row-cols-md-4 row-cols-lg-5">
            {slicedSeries.map((serieList, index) => (
              <ListCard
                key={index}
                mediaList={serieList}
                media={"tv"}
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
            onClick={loadMoreSeries}
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

export default Serie;