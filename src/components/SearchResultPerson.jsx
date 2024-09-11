import React from "react";
import CardPerson from "../components/CardPerson";
import sliceFive from "../utils/sliceFive";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import fetchConfiguration from "../api/fetchConfiguration";
import loadApiDataPerson from "../api/personSearchApi";

const SearchResultPerson = ({ shouldFetch, query }) => {
  const {
    data: config,
    isLoading: isLoadingConfig,
    error: errorConfig,
  } = useQuery({
    queryKey: ["configuration"],
    queryFn: fetchConfiguration,
    select: (data) => ({
      imageUrl: data.images.base_url + data.images.profile_sizes[1],
    }),
  });

  const {
    data: mediaArray,
    isLoading: isLoadingMedia,
    error: errorMedia,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["media", query],
    queryFn: ({ pageParam = 1 }) => {
      return loadApiDataPerson({ queryKey: ["mediaArray", query, pageParam] });
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
            {slicedMedia.map((personList, index) => (
              <React.Fragment key={index}>
                {personList.map((person) => (
                  <div key={person.id} className="col mb-4">
                    <CardPerson
                      media="person"
                      imageUrl={config.imageUrl + person.profile_path}
                      opts={person}
                    />
                  </div>
                ))}
              </React.Fragment>
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

export default SearchResultPerson;