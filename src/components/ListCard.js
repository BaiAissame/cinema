import React from 'react';
import Card from "../components/ui/Card";

const ListCard = ({movieList,media,imageUrl}) => {
  return (
    <>
        {movieList.map((movie, index) => (
        <div key={index} className="col mb-4">
            <Card media={media} opts={movie} imageUrl={imageUrl}/>
        </div>
        ))}
    </>
  )
}

export default ListCard;