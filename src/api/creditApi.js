const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzODM5YWZkYjZlMjI5N2Y4MDMwYTViNWVlNTJkMjBiYSIsInN1YiI6IjY2NmY0MmIyMDYyNTRhY2JjOWVjMDE2MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xoxStgNC8pIKEItzhDhfCX0y443PbLYpEPQllneU34I",
  },
};

export const loadCast = async ({ queryKey }) => {
  const [, media, id] = queryKey;
  const response = await fetch(
    `https://api.themoviedb.org/3/${media}/${id}/credits?language=fr-FR`,
    options
  );
  if (!response.ok) {
    throw new Error("network response not ok");
  }
  const data = await response.json();
  return data;
};

export const loadCombinedCredit = async ({ queryKey }) => {
  const [, id] = queryKey;
  const response = await fetch(
    `https://api.themoviedb.org/3/person/${id}/credits?language=fr-FR`,
    options
  );
  if (!response.ok) {
    throw new Error("network response not ok");
  }
  const data = await response.json();
  return data;
};
// eslint-disable-next-line 
export default { loadCast, loadCombinedCredit };
