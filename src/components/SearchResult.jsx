import React from "react";
import ListCard from "../components/ListCard";
import sliceFive from "../utils/sliceFive";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import {
  loadApiDataMovie,
  loadApiDataWithFiltersMovie,
} from "../api/movieSearchApi";
import {
  loadApiDataSerie,
  loadApiDataWithFiltersSerie,
} from "../api/serieSearchApi";
import fetchConfiguration from "../api/fetchConfiguration";

const SearchResult = ({
  shouldFetch,
  filtersSelected,
  filters,
  query,
  media,
}) => {
  const {
    data: config,
    isLoading: isLoadingConfig,
    error: errorConfig,
  } = useQuery({
    queryKey: ["configuration"],
    queryFn: fetchConfiguration,
    select: (data) => ({
      imageUrl: data.images.base_url + data.images.backdrop_sizes[1],
    }),
  });
  const loadApiData = media === "tv" ? loadApiDataSerie : loadApiDataMovie;
  const loadApiDataWithFilters = media === "tv" ? loadApiDataWithFiltersSerie : loadApiDataWithFiltersMovie;

  const {
    data: mediaArray,
    isLoading: isLoadingMedia,
    error: errorMedia,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["media", query, filters[filtersSelected], media],
    queryFn: ({ pageParam = 1 }) => {
      if (query) {
        return loadApiData({ queryKey: ["mediaArray", query, pageParam] });
      } else {
        return loadApiDataWithFilters({
          queryKey: ["mediaArray", filters[filtersSelected], pageParam],
        });
      }
    },
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.page < lastPage.total_pages
        ? lastPage.page + 1
        : undefined;
    },
    enabled: shouldFetch,
    keepPreviousData: true,
  });

  const loadMoreMedia = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };
  if (isLoadingMedia || isLoadingConfig) {
    return null;
  }

  if (errorMedia || errorConfig) {
    return (
      <div>
        Error occurred: {errorMedia ? errorMedia.message : errorConfig.message}
      </div>
    );
  }
  const allMedia = mediaArray?.pages.flatMap((page) => page.results) ?? [];
  const slicedMedia = sliceFive(allMedia);
  return (
    <>
      {slicedMedia && slicedMedia.length > 0 && (
        <div className="container">
          <div className="row row-cols-1 row-cols-sm-3 row-cols-md-4 row-cols-lg-5">
            {slicedMedia.map((mediaList, index) => (
              <ListCard
                key={index}
                mediaList={mediaList}
                media={media}
                imageUrl={config.imageUrl}
              />
            ))}
          </div>
        </div>
      )}

      {hasNextPage && (
        <div className="d-flex justify-content-center my-4">
          <button
            className="btn"
            onClick={loadMoreMedia}
            disabled={isFetchingNextPage}
            style={{ backgroundColor: "#FFA500" }}
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
              "Charger"
            )}
          </button>
        </div>
      )}
    </>
  );
};

export default SearchResult;
