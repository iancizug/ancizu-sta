import Category from './components/Category';

async function getPeliculas() {
  const res = await fetch(`${process.env.API_URL}/peliculas`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Error al obtener las películas');
  return res.json();
}

async function getActores() {
  const res = await fetch(`${process.env.API_URL}/actores`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Error al obtener los actores');
  return res.json();
}

export default async function Home() {
  const peliculasData = await getPeliculas();
  const actoresData = await getActores();

  const peliculasMapeadas = peliculasData.map(p => {
    const nombresActores = (p.actores || []).map(idActor => {
      const actor = actoresData.find(a => a.id === idActor);
      return actor ? actor.nombreCompleto : `ID: ${idActor}`;
    });

    return {
      titulo: p.nombre,
      actores: nombresActores.length > 0 ? nombresActores.join(', ') : 'Sin actores',
      año: p.año
    };
  });

  return (
    <main style={{ padding: '20px' }}>
      <h1 style={{ textAlign: 'center' }}>Mi app de cine (Next.js)</h1>
      <Category 
        categoria="Catálogo General" 
        peliculas={peliculasMapeadas} 
      />
    </main>
  );
}