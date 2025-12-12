const REACT_APP_TMDB_API_KEY = "11a3f85c405ec2580bb40a327c724d64";
const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/";

function getApiKey() {
  const key = REACT_APP_TMDB_API_KEY;
  if (!key) {
    throw new Error(
      "Missing TMDB API key. Create a .env file with REACT_APP_TMDB_API_KEY=YOUR_KEY and restart the dev server."
    );
  }
  return key;
}

async function tmdbGet(path, params = {}) {
  const apiKey = getApiKey();

  const searchParams = new URLSearchParams({ api_key: apiKey, ...params });
  const url = `${TMDB_BASE_URL}${path}?${searchParams.toString()}`;

  const res = await fetch(url, {
    headers: {
      accept: "application/json",
    },
  });

  if (!res.ok) {
    let message = `TMDB request failed: ${res.status} ${res.statusText}`;
    try {
      const body = await res.json();
      if (body?.status_message) message = body.status_message;
    } catch {
      // ignore
    }
    throw new Error(message);
  }

  return res.json();
}

export function getPosterUrl(posterPath, size = "w500") {
  if (!posterPath) return null;
  return `${TMDB_IMAGE_BASE_URL}${size}${posterPath}`;
}

export async function getPopularMovies({ page = 1 } = {}) {
  // Includes: poster_path, title, release_date, vote_average, id
  return tmdbGet("/movie/popular", { language: "en-US", page });
}

export async function getMovieDetails(movieId) {
  return tmdbGet(`/movie/${movieId}`, { language: "en-US" });
}
