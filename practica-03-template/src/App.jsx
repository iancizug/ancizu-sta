import React, { useState, useEffect } from 'react';
import Category from './components/Category';
import './App.css';

function App() {
  const [peliculas, setPeliculas] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Acción');
  const [error, setError] = useState(null);

  useEffect(() => {
    // Hacemos peticiones diferentes según la categoría seleccionada a la API
    Promise.all([
      fetch(`http://localhost:3000/peliculas?categoria=${categoriaSeleccionada}`).then(res => {
        if (!res.ok) throw new Error('Error al cargar películas');
        return res.json();
      }),
      fetch('http://localhost:3000/actores').then(res => {
        if (!res.ok) throw new Error('Error al cargar actores');
        return res.json();
      })
    ])
      .then(([peliculasData, actoresData]) => {
        const peliculasMapeadas = peliculasData.map(p => {
          const nombresActores = (p.actores || []).map(idActor => {
            const actorEncontrado = actoresData.find(a => a.id === idActor);
            return actorEncontrado ? actorEncontrado.nombreCompleto : `ID: ${idActor}`;
          });

          return {
            titulo: p.nombre,
            actores: nombresActores.length > 0 ? nombresActores.join(', ') : 'Sin actores',
            año: p.año
          };
        });

        setPeliculas(peliculasMapeadas);
      })
      .catch((err) => {
        console.error('Error de conexión:', err);
        setError(err.message);
      });
  }, [categoriaSeleccionada]); // Se vuelve a ejecutar y hace fetch cada vez que cambia el selector

  return (
    <div className="app">
      <h1>Ancizuflix</h1>
      
      {/* Selector de categorías requerido por el Checkpoint 3.4 */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <label htmlFor="categoria-select" style={{ marginRight: '10px', fontWeight: 'bold' }}>Selecciona categoría:</label>
        <select 
          id="categoria-select"
          value={categoriaSeleccionada} 
          onChange={(e) => setCategoriaSeleccionada(e.target.value)}
          style={{ padding: '5px 10px', borderRadius: '4px' }}
        >
          <option value="Acción">Acción</option>
          <option value="Drama">Drama</option>
        </select>
      </div>

      {error && <p style={{ color: '#ff6b6b', textAlign: 'center' }}>Error: {error}</p>}
      
      {peliculas.length === 0 && !error && (
        <p style={{ textAlign: 'center' }}>Cargando películas...</p>
      )}

      {peliculas.length > 0 && (
        <Category 
          categoria={categoriaSeleccionada} 
          peliculas={peliculas} 
        />
      )}
    </div>
  );
}

export default App;