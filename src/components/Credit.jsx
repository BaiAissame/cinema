import React, { useState, useEffect } from "react";
import CardPerson from "./CardPerson";
import fetchConfiguration from "../api/fetchConfiguration";
import { loadCast } from "../api/creditApi";
import { useQuery } from '@tanstack/react-query';

function Credit({ media, id }) {

  const {
    data: data,
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
    <div>
      <ul className="scrollcast">
        {data.cast.map((person) => (
          <li key={person.id}>
            <CardPerson
              media={"person"}
              imageUrl={config.imageUrl + person.profile_path}
              opts={person}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Credit;
