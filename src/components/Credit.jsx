import React from "react";
import CardPerson from "./CardPerson";
import fetchConfiguration from "../api/fetchConfiguration";
import { loadCast } from "../api/creditApi";
import { useQuery } from '@tanstack/react-query';

function Credit({ media, id }) {

  const {
    data: dataCredit,
    isLoading: isLoadingCredit,
    error: errorCredit,
  } = useQuery({
    queryKey: ["credit", media, id],
    queryFn: () => loadCast({ queryKey: ["credit", media, id] }),
  });

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

  if (isLoadingCredit || isLoadingConfig) {
    return null;
  }
  if (errorCredit)
    return (
      <div>Erreur lors du chargement des détails : {errorCredit.message}</div>
    );
  if (errorConfig)
    return (
      <div>
        Erreur lors du chargement de la configuration : {errorConfig.message}
      </div>
    );
    return (
      <div className="container-fluid px-0">
        <div className="row flex-nowrap overflow-auto g-2">
          {dataCredit.cast.map((person) => (
            <div key={person.id} className="col-4 col-sm-3 col-md-2 col-xl-1">
              <CardPerson
                media="person"
                imageUrl={config.imageUrl + person.profile_path}
                opts={person}
              />
            </div>
          ))}
        </div>
      </div>
    );
}
export default Credit;
