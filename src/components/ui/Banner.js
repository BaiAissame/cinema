import React, { useEffect, useRef } from "react";
import { formatDate } from "../../utils/formatDate";

export default function Banner({ title, poster_url, synopsis, release_date,image_url}) {
  const bannerRef = useRef(null);

  useEffect(() => {
    if (bannerRef.current) {
      bannerRef.current.style.backgroundImage = `linear-gradient(to right, rgba(0,0,0,1), rgba(0,0,0,0)), url('${poster_url}')`;
    }
  }, [poster_url]);

  return (
    <div ref={bannerRef} className="banner d-flex align-items-center">
      <img className="img-thumbnail poster" src={image_url} alt="Poster" />
      <div className="ms-3 text-light poster">
        <h3>{title}</h3>
        <p className="fs-6">{formatDate(release_date)}</p>
        <p className="fs-6">Synopsis</p>
        <p className="fs-8">{synopsis}</p>
      </div>
    </div>
  );
}
