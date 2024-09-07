import React from "react";
import { Link } from "react-router-dom";
import { formatDate } from "../../utils/formatDate";
import showPlaceholder from "../../image/showPlaceholder.png";
function Card({ media, opts, imageUrl }) {
  return (
    <div
      className="card shadow p-3 ms-3 mb-5 bg-body-tertiary rounded"
      style={{ width: "100%" }}
    >
      <img
        src={imageUrl.includes("null") ? showPlaceholder : imageUrl}
        className="card-img-top"
        alt={`Poster ${media}`}
        style={{ height: "300px", objectFit: "cover" }}
      />
      <div className="card-body">
        {media === "movie" ? (
          <>
            <Link to={`/movie/${opts.id}`} style={{ textDecoration: "none" }}>
              <h5 className="card-title">{opts.title}</h5>
            </Link>
            <p className="card-text">{opts.release_date ? formatDate(opts.release_date) : null}</p>
          </>
        ) : media === "tv" ? (
          <>
            <Link to={`/tv/${opts.id}`} style={{ textDecoration: "none" }}>
              <h5 className="card-title">{opts.name}</h5>
            </Link>
            <p className="card-text">{opts.first_air_date ? formatDate(opts.first_air_date): null}</p>
          </>
        ) : null}
      </div>
    </div>
  );
}

export default Card;
