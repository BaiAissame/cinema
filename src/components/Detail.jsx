import React from "react";
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Banner from "./ui/Banner";
import Credit from "./Credit";
import { fetchMediaDetail } from '../api/detailApi';
import fetchConfiguration from "../api/fetchConfiguration";
import Trailer from './Trailer';

// const API_KEY=AIzaSyCH-PRnkD1VqBUAXFJHsoXd1R7kRYz5Gx8;

function Detail() {
  const { media, id } = useParams();

  const { data: mediaDetail, isLoading: isLoadingDetail, error: errorDetail } = useQuery({
    queryKey: ['mediaDetail', media, id],
    queryFn: () => fetchMediaDetail({ queryKey: ['mediaDetail', media, id] })
  });

  const { data: config, isLoading: isLoadingConfig, error: errorConfig } = useQuery({
    queryKey: ['configuration'],
    queryFn: fetchConfiguration,
    select: (data) => ({
      posterUrl: data.images.base_url + data.images.backdrop_sizes[3],
      imageUrl: data.images.base_url + data.images.backdrop_sizes[0],
    })
  });

  if (isLoadingDetail || isLoadingConfig) return <div>Chargement...</div>;
  if (errorDetail) return <div>Erreur lors du chargement des détails : {errorDetail.message}</div>;
  if (errorConfig) return <div>Erreur lors du chargement de la configuration : {errorConfig.message}</div>;

  return (
    <div className="container">
      <Banner 
        title={mediaDetail.title} 
        poster_url={config.posterUrl + mediaDetail.poster_path} 
        image_url={config.imageUrl + mediaDetail.poster_path} 
        synopsis={mediaDetail.overview} 
        release_date={mediaDetail.release_date}
      />
      <Credit media={media} id={id} />
      <Trailer videos={mediaDetail.videos.results} />
    </div>
  );
}

export default Detail;