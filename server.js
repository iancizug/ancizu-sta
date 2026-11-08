const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(express.json());

const leerDatos = (archivo) => {
    try {
        if (!fs.existsSync(archivo)) return [];
        return JSON.parse(fs.readFileSync(archivo, 'utf-8'));
    } catch (error) {
        return null; // Devuelve null si hay error interno de lectura
    }
};

const escribirDatos = (archivo, datos) => {
    fs.writeFileSync(archivo, JSON.stringify(datos, null, 2));
};

// ==================== ENDPOINTS DE PELÍCULAS ====================

// Listar películas (200 OK o 500 Server Error)
app.get('/peliculas', (req, res) => {
    const peliculas = leerDatos('peliculas.json');
    if (peliculas === null) {
        return res.status(500).json({ error: "500 Server Error: Error interno del servidor" });
    }
    res.status(200).json(peliculas);
});

// Crear película (201 Created, 400 Bad Request o 500)
app.post('/peliculas', (req, res) => {
    if (!req.body.nombre || !req.body.año) {
        return res.status(400).json({ error: "400 Bad Request: Faltan campos obligatorios (nombre o año)" });
    }
    
    const peliculas = leerDatos('peliculas.json');
    if (peliculas === null) return res.status(500).json({ error: "500 Server Error" });

    const nuevaPelicula = {
        id: peliculas.length > 0 ? peliculas[peliculas.length - 1].id + 1 : 1,
        nombre: req.body.nombre,
        año: req.body.año,
        actores: req.body.actores || []
    };
    
    peliculas.push(nuevaPelicula);
    escribirDatos('peliculas.json', peliculas);
    res.status(201).json(nuevaPelicula); // 201 Created
});

// Modificar película completa (200 OK, 404 Not Found o 400 Bad Request)
app.put('/peliculas/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ error: "400 Bad Request: ID inválido" });
    }

    let peliculas = leerDatos('peliculas.json');
    const index = peliculas.findIndex(p => p.id === id);

    if (index === -1) {
        return res.status(404).json({ error: "404 Not Found: La película no existe" });
    }

    if (req.body.nombre) peliculas[index].nombre = req.body.nombre;
    if (req.body.año) peliculas[index].año = req.body.año;
    if (req.body.actores) peliculas[index].actores = req.body.actores;

    escribirDatos('peliculas.json', peliculas);
    res.status(200).json(peliculas[index]); // 200 OK
});

// Modificar parcialmente una película (Cambiar nombre, año, añadir actor o quitar actor)
app.patch('/peliculas/:id', (req, res) => {
    let peliculas = leerDatos('peliculas.json');
    const id = parseInt(req.params.id);
    const index = peliculas.findIndex(p => p.id === id);

    if (index === -1) return res.status(404).json({ error: "404 Not Found: Película no encontrada" });

    // 1. Cambiar nombre si viene en la petición
    if (req.body.nombre !== undefined) {
        peliculas[index].nombre = req.body.nombre;
    }

    // 2. Cambiar año si viene en la petición
    if (req.body.año !== undefined) {
        peliculas[index].año = req.body.año;
    }

    // 3. Añadir actor (recibe el ID del actor a añadir)
    if (req.body.addActor !== undefined) {
        const idActor = req.body.addActor;
        if (!peliculas[index].actores.includes(idActor)) {
            peliculas[index].actores.push(idActor);
        }
    }

    // 4. Quitar actor (recibe el ID del actor a eliminar)
    if (req.body.removeActor !== undefined) {
        const idActor = req.body.removeActor;
        peliculas[index].actores = peliculas[index].actores.filter(aId => aId !== idActor);
    }

    escribirDatos('peliculas.json', peliculas);
    res.status(200).json(peliculas[index]); // 200 OK
});

// Borrar película (204 No Content o 404 Not Found)
app.delete('/peliculas/:id', (req, res) => {
    const id = parseInt(req.params.id);
    let peliculas = leerDatos('peliculas.json');
    const index = peliculas.findIndex(p => p.id === id);

    if (index === -1) {
        return res.status(404).json({ error: "404 Not Found: Película no encontrada" });
    }

    peliculas = peliculas.filter(p => p.id !== id);
    escribirDatos('peliculas.json', peliculas);
    
    res.status(204).send(); // 204 No Content
});


// ==================== ENDPOINTS DE ACTORES ====================

// Listar actores (200 OK)
app.get('/actores', (req, res) => {
    const actores = leerDatos('actores.json');
    if (actores === null) return res.status(500).json({ error: "500 Server Error" });
    res.status(200).json(actores);
});

// Crear actor (201 Created o 400 Bad Request)
app.post('/actores', (req, res) => {
    if (!req.body.nombreCompleto) {
        return res.status(400).json({ error: "400 Bad Request: Falta el nombreCompleto" });
    }

    const actores = leerDatos('actores.json');
    const nuevoActor = {
        id: actores.length > 0 ? actores[actores.length - 1].id + 1 : 1,
        nombreCompleto: req.body.nombreCompleto,
        añoNacimiento: req.body.añoNacimiento || null
    };

    actores.push(nuevoActor);
    escribirDatos('actores.json', actores);
    res.status(201).json(nuevoActor); // 201 Created
});

// Modificar un actor (NombreCompleto o AñoNacimiento)
app.patch('/actores/:id', (req, res) => {
    let actores = leerDatos('actores.json');
    const id = parseInt(req.params.id);
    const index = actores.findIndex(a => a.id === id);

    if (index === -1) return res.status(404).json({ error: "404 Not Found: Actor no encontrado" });

    // 1. Cambiar nombre del actor si viene en la petición
    if (req.body.nombreCompleto !== undefined) {
        actores[index].nombreCompleto = req.body.nombreCompleto;
    }

    // 2. Cambiar año de nacimiento si viene en la petición
    if (req.body.añoNacimiento !== undefined) {
        actores[index].añoNacimiento = req.body.añoNacimiento;
    }

    escribirDatos('actores.json', actores);
    res.status(200).json(actores[index]); // 200 OK
});

// Borrar actor (204 No Content o 404 Not Found)
app.delete('/actores/:id', (req, res) => {
    const id = parseInt(req.params.id);
    let actores = leerDatos('actores.json');
    const index = actores.findIndex(a => a.id === id);

    if (index === -1) {
        return res.status(404).json({ error: "404 Not Found: Actor no encontrado" });
    }

    actores = actores.filter(a => a.id !== id);
    escribirDatos('actores.json', actores);
    res.status(204).send(); // 204 No Content
});

// Arrancar servidor
app.listen(PORT, () => {
    console.log(`Servidor API corriendo en http://localhost:${PORT}`);
});