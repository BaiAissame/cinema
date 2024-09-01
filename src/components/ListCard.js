import React from 'react';
import Card from "../components/ui/Card";

const ListCard = ({movieList,media}) => {
  return (
    <>
        {movieList.map((movie, index) => (
        <div key={index} className="col-12 col-md-6 col-lg-4 col-xl-3 col-xxl-2 mb-4">
            <Card media={media} opts={movie} />
        </div>
        ))}
    </>
  )
}
export default ListCard;