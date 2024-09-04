import React from 'react';
import Card from "../components/ui/Card";
//Changer ListCard =>adaptable pour les série aussi
const ListCard = ({movieList,media,imageUrl}) => {
  return (
    <>
        {movieList.map((movie, index) => (
        <div key={index} className="col mb-4">
            <Card media={media} opts={movie} imageUrl={imageUrl+movie.backdrop_path}/>
        </div>
        ))}
    </>
  )
}

export default ListCard;