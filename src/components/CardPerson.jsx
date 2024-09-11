import React from "react";
import { Link } from "react-router-dom";
import defaultImage from "../image/defaultImage.svg";

function CardPerson({ media, opts, imageUrl }) {
  console.log(opts);
  return (
    <div
      className="card shadow p-3 ms-3 mb-5 bg-body-tertiary rounded"
      style={{ width: "100%" }}
    >
      <img
        src={imageUrl.includes("null") ? defaultImage : imageUrl}
        className="card-img-top"
        alt={`Poster ${media}`}
        style={{ height: "300px", objectFit: "cover" }}
      />
      <div className="card-body">
        <Link to={`/${media}/${opts.id}`} style={{ textDecoration: "none" }}>
          <h5 className="card-title">{opts.name}</h5>
        </Link>
        <p className="card-text">{opts.character}</p>
      </div>
    </div>
  );
}

export default CardPerson;
