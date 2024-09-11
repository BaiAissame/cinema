import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import  fetchMediaDetail  from '../api/detailApi';
import fetchConfiguration from "../api/fetchConfiguration";
import { loadCombinedCredit } from "../api/creditApi";

function PersonDetail() {
    const { media, id } = useParams();

  const { data: artistDetail, isLoading: isLoadingDetail, error: errorDetail } = useQuery({
    queryKey: ['artistDetail',media, id],
    queryFn: () => fetchMediaDetail({ queryKey: ['artistDetail', media, id] }),
  });
  const { data: artistCredit, isLoading: isLoadingCredit, error: errorCredit } = useQuery({
    queryKey: ['artistCredit', id],
    queryFn: () => loadCombinedCredit({ queryKey: ['artistCredit', id] }),
  });


  const { data: config, isLoading: isLoadingConfig, error: errorConfig } = useQuery({
    queryKey: ['configuration'],
    queryFn: fetchConfiguration,
    select: (data) => ({ imageUrl: data.images.base_url + data.images.profile_sizes[2] }),
  });

  if (isLoadingDetail || isLoadingConfig  ||  isLoadingCredit) return null;
  if (errorDetail) return <div>Erreur lors du chargement des détails : {errorDetail.message}</div>;
  if (errorConfig) return <div>Erreur lors du chargement de la configuration : {errorConfig.message}</div>;
  if (errorCredit) return <div>Erreur lors du chargement de la configuration : {errorCredit.message}</div>;

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-4">
          <div className="text-center mb-4">
            <img
              src={config.imageUrl + artistDetail.profile_path}
              alt={artistDetail.name}
              className="img-fluid rounded-circle border border-secondary"
              style={{ maxWidth: '100%', height: 'auto' }}
            />
            <h3 className="mt-3">{artistDetail.name}</h3>
            <p>
              <strong>Date de naissance:</strong> {artistDetail.birthday}
            </p>
            <p>
              <strong>Nationalité:</strong> {artistDetail.place_of_birth}
            </p>
          </div>
        </div>
  

        <div className="col-md-8">
          <div className="mb-4">
            <h4 className="mb-3">Biographie</h4>
            <p>{artistDetail.biography}</p>
          </div>
  
          <div>
            <h4 className="mb-3">Œuvres</h4>
            <ul className="list-group">
              {artistCredit.cast.slice(0, 15).map((work) => (
                <li key={work.id} className="list-group-item">
                  <strong>{work.title || work.name}</strong> - {work.character ? `Rôle : ${work.character}` : ''}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PersonDetail;

