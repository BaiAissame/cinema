
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzODM5YWZkYjZlMjI5N2Y4MDMwYTViNWVlNTJkMjBiYSIsInN1YiI6IjY2NmY0MmIyMDYyNTRhY2JjOWVjMDE2MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xoxStgNC8pIKEItzhDhfCX0y443PbLYpEPQllneU34I",
  },
};



export const fetchConfiguration = async () => {
    const response = await fetch(
      "https://api.themoviedb.org/3/configuration",
      options
    );
    if (!response.ok) {
      throw new Error("Erreur réseau");
    }
    const data = await response.json();
    return data;
  };

export default fetchConfiguration;