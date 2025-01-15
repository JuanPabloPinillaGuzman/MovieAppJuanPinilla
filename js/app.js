const apiKey = 'your_api_key'; // Sustituye con tu clave API de OMDb

// Función de búsqueda
async function searchMovie() {
  const query = document.getElementById('searchInput').value;
  if (!query) {
    document.getElementById('movieList').innerHTML = '';
    document.getElementById('movieDetails').style.display = 'none';
    return;
  }

  const response = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=${apiKey}`);
  const data = await response.json();
  
  if (data.Response === 'True') {
    displayMovieList(data.Search);
  } else {
    document.getElementById('movieList').innerHTML = '<p>No se encontraron películas.</p>';
  }
}

// Mostrar lista de películas
function displayMovieList(movies) {
  const movieListContainer = document.getElementById('movieList');
  movieListContainer.innerHTML = '';
  movies.forEach(movie => {
    const movieItem = document.createElement('div');
    movieItem.classList.add('movie-item');
    movieItem.innerHTML = `
      <img src="${movie.Poster}" alt="${movie.Title}">
      <h3>${movie.Title}</h3>
    `;
    movieItem.onclick = () => fetchMovieDetails(movie.imdbID);
    movieListContainer.appendChild(movieItem);
  });
}

// Obtener detalles de una película
async function fetchMovieDetails(imdbID) {
  const response = await fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=${apiKey}`);
  const data = await response.json();

  if (data.Response === 'True') {
    displayMovieDetails(data);
  }
}

// Mostrar los detalles de una película
function displayMovieDetails(movie) {
  const movieDetailsContainer = document.getElementById('movieDetails');
  movieDetailsContainer.style.display = 'block';
  movieDetailsContainer.innerHTML = `
    <img src="${movie.Poster}" alt="${movie.Title}">
    <h2>${movie.Title}</h2>
    <p><strong>Descripción:</strong> ${movie.Plot}</p>
    <p><strong>Duración:</strong> ${movie.Runtime}</p>
    <p><strong>Fecha de lanzamiento:</strong> ${movie.Released}</p>
  `;
}
