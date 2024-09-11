import React from "react";
import { formatDate } from "../../utils/formatDate";

export default function Banner({ title, poster_url, synopsis, release_date, image_url }) {
  return (
    <div 
      className="banner d-flex align-items-center mb-4" 
      style={{
        backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.8), rgba(0,0,0,0.3)), url('${image_url}')`,
      }}
    >
      <div className="banner-content d-flex align-items-center">
        <img className="img-thumbnail poster" src={poster_url} alt="Poster" />
        <div className="ms-3 text-light poster-info">
          <h3>{title}</h3>
          <p className="fs-6">{formatDate(release_date)}</p>
          <p className="fs-6">Synopsis</p>
          <p className="fs-8">{synopsis}</p>
        </div>
      </div>
    </div>
  );
}
