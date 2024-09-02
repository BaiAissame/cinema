import React from 'react';
import { Link } from 'react-router-dom';
import { formatDate } from '../../utils/formatDate';

function Card({ media, opts,imageUrl }) {
  return (
    <div className="card shadow p-3 ms-3 mb-5 bg-body-tertiary rounded" style={{ width: '100%' }}>
    <img
      src={imageUrl+opts.backdrop_path}
      className="card-img-top"
      alt={`Poster ${media}`}
      style={{ height: '300px', objectFit: 'cover' }}
    />
    <div className="card-body">
      <Link to={`/${media}/${opts.id}`} style={{ textDecoration: 'none' }}>
        <h5 className="card-title">{opts.title}</h5>
      </Link>
      <p className="card-text">{formatDate(opts.release_date)}</p>
    </div>
  </div>
  );
}

export default Card;
