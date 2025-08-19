const API_KEY = 'https://www.omdbapi.com/?i=tt3896198&apikey=ab0a1f7b'; // 👈 PASTE YOUR OMDb API KEY HERE
const BASE_URL = 'http://www.omdbapi.com/';
const movieGrid = document.getElementById('movie-grid');
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');

// Initial fetch for a default popular movie since OMDb search requires a query
getMoviesByTitle('Guardians of the Galaxy Vol. 3');

// Function to fetch movies by title from the API
async function getMoviesByTitle(title) {
    const url = `${BASE_URL}?s=${encodeURIComponent(title)}&apikey=${API_KEY}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        if (data.Response === 'True') {
            displayMovies(data.Search);
        } else {
            movieGrid.innerHTML = `<p class="error-message">No movies found. Try a different search.</p>`;
        }
    } catch (error) {
        console.error("Failed to fetch movies:", error);
        movieGrid.innerHTML = `<p class="error-message">Failed to load movies. Please check your API key or try again later.</p>`;
    }
}

// Function to display movies on the page
function displayMovies(movies) {
    movieGrid.innerHTML = '';
    
    movies.forEach(movie => {
        const { Title, Year, Poster, imdbID } = movie;

        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');
        movieCard.innerHTML = `
            <img src="${Poster !== 'N/A' ? Poster : 'https://via.placeholder.com/500x750.png?text=No+Image'}" alt="${Title} poster">
            <div class="movie-info">
                <h3>${Title} (${Year})</h3>
            </div>
        `;
        movieGrid.appendChild(movieCard);
    });
}

// Event listener for the search form
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchTerm = searchInput.value.trim();
    if (searchTerm) {
        getMoviesByTitle(searchTerm);
        searchInput.value = '';
    } else {
        // If search is empty, reload a default movie
        getMoviesByTitle('Guardians of the Galaxy Vol. 3');
    }
});
