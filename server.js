const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(express.json());

const leerDatos = (archivo) => {
    if (!fs.existsSync(archivo)) return [];
    return JSON.parse(fs.readFileSync(archivo, 'utf-8'));
};

const escribirDatos = (archivo, datos) => {
    fs.writeFileSync(archivo, JSON.stringify(datos, null, 2));
};

// ==================== ENDPOINTS DE PELÍCULAS ====================

// Listar películas
app.get('/peliculas', (req, res) => {
    res.json(leerDatos('peliculas.json'));
});

// Crear película
app.post('/peliculas', (req, res) => {
    const peliculas = leerDatos('peliculas.json');
    const nuevaPelicula = {
        id: peliculas.length > 0 ? peliculas[peliculas.length - 1].id + 1 : 1,
        nombre: req.body.nombre,
        año: req.body.año,
        actores: req.body.actores || []
    };
    peliculas.push(nuevaPelicula);
    escribirDatos('peliculas.json', peliculas);
    res.status(201).json(nuevaPelicula);
});

// Modificar película (Nombre, Año, o gestionar actores)
app.put('/peliculas/:id', (req, res) => {
    let peliculas = leerDatos('peliculas.json');
    const id = parseInt(req.params.id);
    const index = peliculas.findIndex(p => p.id === id);

    if (index === -1) return res.status(404).json({ error: "Película no encontrada" });

    if (req.body.nombre) peliculas[index].nombre = req.body.nombre;
    if (req.body.año) peliculas[index].año = req.body.año;
    if (req.body.actores) peliculas[index].actores = req.body.actores;

    escribirDatos('peliculas.json', peliculas);
    res.json(peliculas[index]);
});

// Borrar película
app.delete('/peliculas/:id', (req, res) => {
    let peliculas = leerDatos('peliculas.json');
    const id = parseInt(req.params.id);
    peliculas = peliculas.filter(p => p.id !== id);
    escribirDatos('peliculas.json', peliculas);
    res.json({ mensaje: "Película borrada correctamente" });
});


// ==================== ENDPOINTS DE ACTORES ====================

// Listar actores
app.get('/actores', (req, res) => {
    res.json(leerDatos('actores.json'));
});

// Crear actor
app.post('/actores', (req, res) => {
    const actores = leerDatos('actores.json');
    const nuevoActor = {
        id: actores.length > 0 ? actores[actores.length - 1].id + 1 : 1,
        nombreCompleto: req.body.nombreCompleto,
        añoNacimiento: req.body.añoNacimiento
    };
    actores.push(nuevoActor);
    escribirDatos('actores.json', actores);
    res.status(201).json(nuevoActor);
});

// Modificar actor
app.put('/actores/:id', (req, res) => {
    let actores = leerDatos('actores.json');
    const id = parseInt(req.params.id);
    const index = actores.findIndex(a => a.id === id);

    if (index === -1) return res.status(404).json({ error: "Actor no encontrado" });

    if (req.body.nombreCompleto) actores[index].nombreCompleto = req.body.nombreCompleto;
    if (req.body.añoNacimiento) actores[index].añoNacimiento = req.body.añoNacimiento;

    escribirDatos('actores.json', actores);
    res.json(actores[index]);
});

// Borrar actor
app.delete('/actores/:id', (req, res) => {
    let actores = leerDatos('actores.json');
    const id = parseInt(req.params.id);
    actores = actores.filter(a => a.id !== id);
    escribirDatos('actores.json', actores);
    res.json({ mensaje: "Actor borrado correctamente" });
});

// Arrancar servidor
app.listen(PORT, () => {
    console.log(`Servidor API corriendo en http://localhost:${PORT}`);
});