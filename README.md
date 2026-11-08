# Práctica - Servicios Telemáticos Avanzados (STA)

Repositorio de la asignatura con la implementación de la interfaz web, consumo de la API de OMDb y desarrollo de un backend completo con NodeJS.

## 🌐 Enlaces del Proyecto
**GitHub Pages (Frontend):** https://iancizug.github.io/ancizu-sta/

---

## 📋 Documentación de la API: Películas y Actores

**Lanzamiento del servidor:** `node server.js`
**URL Base:** `http://localhost:3000`
**Herramienta de prueba recomendada:** `cURL` (Terminal CMD de Windows)

## 1. Gestión de Actores ##

**Listar todos los actores**

Comando: `curl http://localhost:3000/actores`

Función: Obtiene el array completo con todos los actores registrados en el sistema.

Salida esperada (200 OK): `[{"id":1,"nombreCompleto":"Leonardo DiCaprio","añoNacimiento":1974}]`

**Crear un nuevo actor**

Comando: `curl -X POST http://localhost:3000/actores -H "Content-Type: application/json" -d "{\"nombreCompleto\": \"Keanu Reeves\", \"añoNacimiento\": 1964}"`

Función: Da de alta un nuevo actor asignándole un ID automático.

Salida esperada (201 Created): `{"id":2,"nombreCompleto":"Keanu Reeves","añoNacimiento":1964}`

**Modificar datos de un actor (Nombre o Año)**

Comando: `curl -X PATCH http://localhost:3000/actores/1 -H "Content-Type: application/json" -d "{\"añoNacimiento\": 1975}"`

Función: Actualiza de forma parcial el nombre completo o el año de nacimiento del actor especificado por su ID.

Salida esperada (200 OK): `{"id":1,"nombreCompleto":"Leonardo DiCaprio","añoNacimiento":1975}`

**Borrar un actor**

Comando: `curl -X DELETE http://localhost:3000/actores/1`

Función: Elimina permanentemente al actor del archivo de datos según su ID.

Salida esperada (204 No Content): (Sin texto de respuesta, la consola simplemente devuelve el salto de línea).

## 2. Gestión de Películas ##

**Listar todas las películas**

Comando: `curl http://localhost:3000/peliculas`

Función: Devuelve el array completo con todas las películas almacenadas.

Salida esperada (200 OK): `[{"id":1,"nombre":"Inception","año":2010,"actores":[1]}]`

**Crear una nueva película**

Comando: `curl -X POST http://localhost:3000/peliculas -H "Content-Type: application/json" -d "{\"nombre\": \"Matrix\", \"año\": 1999, \"actores\": []}"`

Función: Registra una nueva película indicando su nombre, año y un array opcional con los IDs de sus actores.

Salida esperada (201 Created): `{"id":2,"nombre":"Matrix","año":1999,"actores":[]}`

**Modificar película completa (PUT)**

Comando: `curl -X PUT http://localhost:3000/peliculas/1 -H "Content-Type: application/json" -d "{\"nombre\": \"Inception Remastered\", \"año\": 2010, \"actores\": [1]}"`

Función: Reemplaza o actualiza por completo los campos principales de la película indicada.

Salida esperada (200 OK): `{"id":1,"nombre":"Inception Remastered","año":2010,"actores":[1]}`

**Cambiar nombre de una película (PATCH)**

Comando: `curl -X PATCH http://localhost:3000/peliculas/1 -H "Content-Type: application/json" -d "{\"nombre\": \"Origen\"}"`

Función: Modifica únicamente el título de la película.

Salida esperada (200 OK): `{"id":1,"nombre":"Origen","año":2010,"actores":[1]}`

**Cambiar año de una película (PATCH)**

Comando: `curl -X PATCH http://localhost:3000/peliculas/1 -H "Content-Type: application/json" -d "{\"año\": 2011}"`

Función: Modifica únicamente el año de lanzamiento de la película.

Salida esperada (200 OK): `{"id":1,"nombre":"Inception","año":2011,"actores":[1]}`

**Añadir un actor a una película (PATCH)**

Comando: `curl -X PATCH http://localhost:3000/peliculas/1 -H "Content-Type: application/json" -d "{\"addActor\": 2}"`

Función: Añade el ID de un actor al array de actores de esa película (si no estaba ya añadido).

Salida esperada (200 OK): `{"id":1,"nombre":"Inception","año":2010,"actores":[1, 2]}`

**Quitar un actor de una película (PATCH)**

Comando: `curl -X PATCH http://localhost:3000/peliculas/1 -H "Content-Type: application/json" -d "{\"removeActor\": 2}"`

Función: Elimina el ID del actor especificado del array de actores de la película.

Salida esperada (200 OK): `{"id":1,"nombre":"Inception","año":2010,"actores":[1]}`

**Borrar una película**

Comando: `curl -X DELETE http://localhost:3000/peliculas/1`

Función: Elimina la película del sistema según su ID.

Salida esperada (204 No Content): (Sin texto de respuesta).
