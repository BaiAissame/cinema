import React from "react";
import { Link } from "react-router-dom";
import defaultImage from "../image/defaultImage.svg";

function CardPerson({ media, opts, imageUrl }) {
  return (
    <div className="card h-100">
      <div className="card-img-wrapper">
        <img
          src={imageUrl.includes("null") ? defaultImage : imageUrl}
          className="card-img-top"
          alt={`Poster ${media}`}
        />
      </div>
      <div className="card-body p-2 d-flex flex-column">
        <Link to={`/${media}/${opts.id}`} className="text-decoration-none">
          <h6 className="card-title mb-1 text-truncate">{opts.name}</h6>
        </Link>
        <p className="card-text small text-muted mb-0 text-truncate">{opts.character}</p>
      </div>
    </div>
  );
}

export default CardPerson;
