import React from 'react';
import Movie from './Movie';
import './Category.css';

function Category({ categoria, peliculas }) {
  return (
    <div className="category-container">
      <h2>Categoría: {categoria}</h2>
      <div className="movies-scroll">
        {Array.isArray(peliculas) && peliculas.map((pelicula, index) => (
          <Movie 
            key={index} 
            titulo={pelicula.titulo} 
            actores={pelicula.actores} 
            año={pelicula.año} 
          />
        ))}
      </div>
    </div>
  );
}

export default Category;