import React, { useState, useEffect } from "react";
import CardPerson from "./CardPerson";

function Credit({ id }) {
  const [cast, setCast] = useState([]);
  const [imageUrl, setImageUrl] = useState("");

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzODM5YWZkYjZlMjI5N2Y4MDMwYTViNWVlNTJkMjBiYSIsInN1YiI6IjY2NmY0MmIyMDYyNTRhY2JjOWVjMDE2MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xoxStgNC8pIKEItzhDhfCX0y443PbLYpEPQllneU34I",
    },
  };

  useEffect(() => {
    loadCast();
  }, []);

  const loadCast = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/credits?language=fr-FR`,
        options
      );
      const data = await response.json();
      setCast(data.cast);
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
      const file_size = data.images.backdrop_sizes[0];
      setImageUrl(base_url + file_size);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div>
      <ul className="scrollcast">
        {cast.map((person) => (
          <li key={person.id}>
            <CardPerson
              media={"person"}
              imageUrl={imageUrl + person.profile_path}
              opts={person}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Credit;
