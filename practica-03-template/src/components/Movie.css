import React, { useState } from 'react';
import './Movie.css';

function Movie({ titulo, actores, año }) {
  const [mostrarInfo, setMostrarInfo] = useState(false);

  return (
    <div className="movie-card">
      <h3>{titulo}</h3>
      {mostrarInfo && (
        <div className="movie-details">
          <p>Actores: {Array.isArray(actores) ? actores.join(', ') : actores}</p>
          <p>Año: {año}</p>
        </div>
      )}
      <button onClick={() => setMostrarInfo(!mostrarInfo)}>
        {mostrarInfo ? "Menos información" : "Más información"}
      </button>
    </div>
  );
}

export default Movie;