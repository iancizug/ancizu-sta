# Práctica 2 - APIs y Javascript (STA)

Servidor backend desarrollado con Node.js y Express para la gestión de películas y actores utilizando archivos JSON locales.

## Endpoints y Pruebas con cURL

### 1. Actores

**Listar todos los actores (GET):**
curl http://localhost:3000/actores

**Listar todas las películas (GET):**
curl http://localhost:3000/peliculas

**Crear un actor (POST):**
curl -X POST http://localhost:3000/actores -H "Content-Type: application/json" -d "{\"nombreCompleto\": \"Keanu Reeves\", \"añoNacimiento\": 1964}"

**Crear una película (POST):**
curl -X POST http://localhost:3000/peliculas -H "Content-Type: application/json" -d "{\"nombre\": \"Matrix\", \"año\": 1999, \"actores\": [2]}"