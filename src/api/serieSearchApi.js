const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzODM5YWZkYjZlMjI5N2Y4MDMwYTViNWVlNTJkMjBiYSIsInN1YiI6IjY2NmY0MmIyMDYyNTRhY2JjOWVjMDE2MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xoxStgNC8pIKEItzhDhfCX0y443PbLYpEPQllneU34I",
    },
  };
  
  export const loadApiDataSerie = async ({ queryKey }) => {
    const [, query, page] = queryKey;
    const response = await fetch(
      `https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=fr-FR&page=${page}`,
      options
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  };
  
  export const loadApiDataWithFiltersSerie = async ({ queryKey }) => {
    const [, filtersSelected, page] = queryKey;
    const response = await fetch(
      `https://api.themoviedb.org/3/tv/${filtersSelected}?language=fr-FR&page=${page}`,
      options
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  };
  
// eslint-disable-next-line
  export default {
    loadApiDataSerie,
    loadApiDataWithFiltersSerie,
  };
  