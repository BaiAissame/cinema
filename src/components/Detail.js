import React, {useState,useEffect} from "react";
import Banner from "./ui/Banner";
import { useParams } from 'react-router-dom';

function Detail() {
  const { media,id } = useParams();
  const [mediaDetail, setMediaDetail] = useState({});
  const [imageUrl, setImageUrl] = useState('');
  const [posterUrl, setPosterUrl] = useState('')

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzODM5YWZkYjZlMjI5N2Y4MDMwYTViNWVlNTJkMjBiYSIsInN1YiI6IjY2NmY0MmIyMDYyNTRhY2JjOWVjMDE2MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xoxStgNC8pIKEItzhDhfCX0y443PbLYpEPQllneU34I",
    },
  };
  useEffect(() => {
    loadDetail();
  }, [])
  
  const loadDetail = async () => {

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/${media}/${id}?language=fr-FR&append_to_response=videos`,
        options
      );
      const data = await response.json();
      setMediaDetail(data);
      console.log(data);
    } catch (err) {
      console.error(err);
    }

    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/configuration",
        options
      );
      const data = await response.json();
      const base_url = data.images.base_url;
      const file_size_poster = data.images.backdrop_sizes[3];
      const file_size_image = data.images.backdrop_sizes[0];
      setPosterUrl(base_url + file_size_poster);
      setImageUrl(base_url + file_size_image);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <Banner title={mediaDetail.title} poster_url={posterUrl+mediaDetail.poster_path} image_url={imageUrl+ mediaDetail.poster_path} synopsis={mediaDetail.overview} release_date={mediaDetail.release_date}/>
    </div>
  );

}

export default Detail;
