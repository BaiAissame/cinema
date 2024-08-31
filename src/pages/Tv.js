import React, { useState, useEffect, useRef } from 'react';

const Tv = () => {
  const [serieArray, setSerieArray] = useState([]);
  const [imageUrl, setImageUrl] = useState('');
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [pages, setPages] = useState([]);
  const [filtersSelected, setFiltersSelected] = useState(4);
  const inputRef = useRef(null);

  const filters = ["popular", "airing_today", "on_the_air", "top_rated"];
  
  useEffect(() => {
    loadApiDataWithFilters();
  }, [filtersSelected, page]);

  const handleFilters = (e) => {
    setPage(1);
    switch (e.target.id) {
      case "option1":
        setFiltersSelected(0);
        break;
      case "option2":
        setFiltersSelected(1);
        break;
      case "option3":
        setFiltersSelected(2);
        break;
      case "option4":
        setFiltersSelected(3);
        break;
      default:
        break;
    }
  };

  const loadApiDataWithFilters = () => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 
      }
    };

    fetch(`https://api.themoviedb.org/3/tv/${filters[filtersSelected]}?language=fr-FR&page=${page}`, options)
      .then(response => response.json())
      .then(response => {
        setSerieArray(sliceFive(response.results));
        setPages(pageArray(response.total_pages));
      })
      .catch(err => console.error(err));

    fetch('https://api.themoviedb.org/3/configuration', options)
      .then(response => response.json())
      .then(response => {
        const base_url = response.images.base_url;
        const file_size = response.images.backdrop_sizes[0];
        setImageUrl(base_url + file_size);
      })
      .catch(err => console.error(err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFiltersSelected(4);
    setPage(1);
    setQuery(inputRef.current.value);
    loadApiData();
  };

  const loadApiData = () => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 
      }
    };

    fetch(`https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=fr-FR&page=${page}`, options)
      .then(response => response.json())
      .then(response => {
        setSerieArray(sliceFive(response.results));
        setPages(pageArray(response.total_pages));
      })
      .catch(err => console.error(err));

    fetch('https://api.themoviedb.org/3/configuration', options)
      .then(response => response.json())
      .then(response => {
        const base_url = response.images.base_url;
        const file_size = response.images.backdrop_sizes[0];
        setImageUrl(base_url + file_size);
      })
      .catch(err => console.error(err));
  };

  const newPage = (pageNumber) => {
    setPage(pageNumber);
  };

  const sliceFive = (array) => {
    return array.slice(0, 5);
  };

  const pageArray = (totalPages) => {
    return Array.from({ length: totalPages }, (_, i) => ({ number: i + 1 }));
  };

  return (
    <div className="serie-search">
      <div className="search">
        <form className="d-flex w-35" role="search" onSubmit={handleSubmit}>
          <input
            className="form-control me-2"
            ref={inputRef}
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button className="btn btn-primary" type="submit">
            <i className="fas fa-search"></i>
          </button>
        </form>
      </div>

      <input onClick={handleFilters} type="radio" className="btn-check" name="options" id="option1" autoComplete="off" />
      <label className="btn btn-secondary" htmlFor="option1">Popularité</label>

      <input onClick={handleFilters} type="radio" className="btn-check" name="options" id="option2" autoComplete="off" />
      <label className="btn btn-secondary" htmlFor="option2">Diffusées le jour même</label>

      <input onClick={handleFilters} type="radio" className="btn-check" name="options" id="option3" autoComplete="off" />
      <label className="btn btn-secondary" htmlFor="option3">En cours de diffusion</label>

      <input onClick={handleFilters} type="radio" className="btn-check" name="options" id="option4" autoComplete="off" />
      <label className="btn btn-secondary" htmlFor="option4">Les mieux notés</label>

      {/* Remplacez le composant ci-dessous par un composant Liste de Séries */}
      <div>
        {/* Affichage de la liste des séries */}
      </div>

      {pages.length > 1 && (
        <nav className="ms-3">
          <ul className="pagination d-flex flex-row flex-nowrap overflow-auto">
            {pages.map(page => (
              <li key={page.number} className="page-item" onClick={() => newPage(page.number)}>
                <a className="page-link" href="#" onClick={(e) => e.preventDefault()}>
                  {page.number}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
};

export default Tv;
