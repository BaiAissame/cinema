import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Pagination from "../components/Pagination";

const Movie = () => {
  const [movieArray, setMovieArray] = useState([]);
  const [imageUrl, setImageUrl] = useState('');
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [totalPages, setTotalPages] = useState(0);
  const [filtersSelected, setFiltersSelected] = useState(4);
  const inputRef = useRef(null);
  const filters = ['popular', 'now_playing', 'upcoming', 'top_rated'];

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzODM5YWZkYjZlMjI5N2Y4MDMwYTViNWVlNTJkMjBiYSIsInN1YiI6IjY2NmY0MmIyMDYyNTRhY2JjOWVjMDE2MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xoxStgNC8pIKEItzhDhfCX0y443PbLYpEPQllneU34I'
    }
  };



  const handleFilters = (e) => {
    setPage(1);
    switch (e.target.id) {
      case 'option1':
        setFiltersSelected(0);
        break;
      case 'option2':
        setFiltersSelected(1);
        break;
      case 'option3':
        setFiltersSelected(2);
        break;
      case 'option4':
        setFiltersSelected(3);
        break;
      default:
        break;
    }
    console.log(filtersSelected);
    loadApiDataWithFilters();
  };

  function sliceFive(arr) {
    let groups = [];
    for (let i = 0; i < arr.length; i += 5) {
      groups.push(arr.slice(i, i + 5));
    }
    return groups;
  }  


  const loadApiDataWithFilters = () => {
    fetch(`https://api.themoviedb.org/3/movie/${filters[filtersSelected]}?language=fr-FR&page=${page}`, options)
      .then((response) => response.json())
      .then((response) => {
            const nbPage = response.total_pages > 50 ? 50 : response.total_pages;
            setTotalPages(nbPage);
            const slicedArray = sliceFive(response.results);
            setMovieArray(slicedArray);         
      })
      .catch((err) => console.error(err));
  

    fetch('https://api.themoviedb.org/3/configuration', options)
      .then((response) => response.json())
      .then((response) => {
        const base_url = response.images.base_url;
        const file_size = response.images.backdrop_sizes[0];
        setImageUrl(base_url + file_size);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFiltersSelected(4);
    document.querySelectorAll('.btn-check').forEach((button) => {
      button.checked = false;
    });
    setPage(1);
    setQuery(inputRef.current.value);
    loadApiData();
  };

  const loadApiData = () => {
    fetch(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=fr-FR&page=${page}`, options)
      .then((response) => response.json())
      .then((response) => {
        setMovieArray(response.results.slice(0, 5));
        const nbPage = response.total_pages > 50 ? 50 : response.total_pages;
        setTotalPages(nbPage);
      })
      .catch((err) => console.error(err));
  };

  const newPage = (pageNumber) => {
    setPage(pageNumber);
    if (filtersSelected < 4) {
      loadApiDataWithFilters();
    } else {
      loadApiData();
    }
  };

  return (
    <div>
      <div className="search">
        <form className="d-flex w-35" role="search" onSubmit={handleSubmit}>
          <input className="form-control me-2" ref={inputRef} type="search" placeholder="Search" aria-label="Search" />
          <button className="btn btn-primary" type="submit">
            <i className="fas fa-search"></i>
          </button>
        </form>
      </div>

      <div className="filters">
        <input onClick={handleFilters} type="radio" className="btn-check" name="options" id="option1" autoComplete="off" />
        <label className="btn btn-secondary" htmlFor="option1">Popularité</label>

        <input onClick={handleFilters} type="radio" className="btn-check" name="options" id="option2" autoComplete="off" />
        <label className="btn btn-secondary" htmlFor="option2">Du moment</label>

        <input onClick={handleFilters} type="radio" className="btn-check" name="options" id="option3" autoComplete="off" />
        <label className="btn btn-secondary" htmlFor="option3">à venir</label>

        <input onClick={handleFilters} type="radio" className="btn-check" name="options" id="option4" autoComplete="off" />
        <label className="btn btn-secondary" htmlFor="option4">Les mieux notés</label>
      </div>

      {movieArray.length > 0 && (
        <div className="movie-list">
          <ul>
            {movieArray.map((movie, index) => (
              <li key={index}>{movie.title}</li>
            ))}
          </ul>
        </div>
      )}

      <Pagination totalPages={totalPages} newPage={newPage}/>
    </div>
  );
};

export default Movie;
