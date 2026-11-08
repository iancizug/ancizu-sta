const apiKey = '53e58f45'; // Tu clave activa

document.getElementById('searchButton').addEventListener('click', (event) => {
    event.preventDefault(); // Evita que la página se recargue si está dentro de un form
    
    const query = document.getElementById('movieInput').value.trim();
    if (!query) {
        alert('Por favor, escribe el título de una película.');
        return;
    }

    const url = `https://www.omdbapi.com/?t=${encodeURIComponent(query)}&apikey=${apiKey}`;
    console.log("Consultando URL:", url);

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log("Respuesta de la API:", data);
            if (data.Response === 'True') {
                document.getElementById('movieTitle').textContent = data.Title;
                document.getElementById('movieDirector').textContent = data.Director;
                document.getElementById('movieYear').textContent = data.Year;
            } else {
                alert('Película no encontrada: ' + (data.Error || ''));
                document.getElementById('movieTitle').textContent = '';
                document.getElementById('movieDirector').textContent = '-';
                document.getElementById('movieYear').textContent = '-';
            }
        })
        .catch(error => {
            console.error('Error al consultar la API:', error);
            alert('Hubo un error de red al realizar la búsqueda.');
        });
});