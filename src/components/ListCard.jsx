import React from 'react';
import Card from "../components/ui/Card";
const ListCard = ({mediaList,media,imageUrl}) => {
  return (
    <>
        {mediaList.map((show, index) => (
        <div key={index} className="col mb-4">
            <Card media={media} opts={show} imageUrl={imageUrl+show.backdrop_path}/>
        </div>
        ))}
    </>
  )
}

export default ListCard;