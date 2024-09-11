import React from 'react';

const FiltersMedia = ({ handleFilters, media }) => {
  const filters = media === 'movie'
    ? [
        { id: 'option1', label: 'Popularité' },
        { id: 'option2', label: 'Du moment' },
        { id: 'option3', label: 'À venir' },
        { id: 'option4', label: 'Les mieux notés' },
      ]
    : [
        { id: 'option1', label: 'Diffusées aujourd\'hui' },
        { id: 'option2', label: 'En cours de diffusion' },
        { id: 'option3', label: 'Populaires' },
        { id: 'option4', label: 'Les mieux évaluées' },
      ];

  return (
    <div className="container d-flex justify-content-center pb-4">
      <div className="btn-group" role="group">
        {filters.map((filter, index) => (
          <React.Fragment key={filter.id}>
            <input
              type="radio"
              className="btn-check"
              name="btnradio"
              id={filter.id}
              autoComplete="off"
              onClick={(e) => handleFilters(e, filter.id)}
            />
            <label 
              className={`btn filter-button ${index === 0 ? 'ms-3' : ''} me-2`} 
              htmlFor={filter.id}
            >
              {filter.label}
            </label>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default FiltersMedia;