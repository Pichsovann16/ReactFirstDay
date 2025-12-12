import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getMovieDetails, getPosterUrl } from "../api/tmdb";

const FALLBACK_POSTER =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1200"><rect width="100%" height="100%" fill="#222"/><text x="50%" y="50%" fill="#aaa" font-size="28" font-family="Arial" text-anchor="middle">No Poster</text></svg>`
  );

export default function MovieDetailsPage() {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        setError(null);
        const data = await getMovieDetails(id);
        if (!cancelled) setMovie(data);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : String(e));
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (error) {
    return (
      <div className="page">
        <header className="header">
          <div className="header__inner">
            <Link className="backLink" to="/">
              ← Back
            </Link>
            <h1 className="header__title">Movie Details</h1>
          </div>
        </header>
        <main className="container">
          <div className="notice notice--error">
            <div className="notice__title">Could not load movie</div>
            <div className="notice__body">{error}</div>
          </div>
        </main>
      </div>
    );
  }

  if (loading || !movie) {
    return (
      <div className="page">
        <header className="header">
          <div className="header__inner">
            <Link className="backLink" to="/">
              ← Back
            </Link>
            <h1 className="header__title">Loading…</h1>
          </div>
        </header>
        <main className="container">
          <div className="notice">Loading movie…</div>
        </main>
      </div>
    );
  }

  const posterUrl = getPosterUrl(movie.poster_path, "w780") || FALLBACK_POSTER;
  const rating =
    typeof movie.vote_average === "number"
      ? movie.vote_average.toFixed(1)
      : "—";

  return (
    <div className="page">
      <header className="header">
        <div className="header__inner">
          <Link className="backLink" to="/">
            ← Back
          </Link>
          <h1 className="header__title">{movie.title}</h1>
        </div>
      </header>

      <main className="container">
        <div className="details">
          <div className="details__posterWrap">
            <img
              className="details__poster"
              src={posterUrl}
              alt={movie.title || "Movie poster"}
            />
          </div>

          <div className="details__content">
            <div className="details__rating">⭐ {rating}</div>

            {Array.isArray(movie.genres) && movie.genres.length > 0 && (
              <div className="genres" aria-label="Genres">
                {movie.genres.map((g) => (
                  <span className="genre" key={g.id}>
                    {g.name}
                  </span>
                ))}
              </div>
            )}

            <h2 className="details__sectionTitle">Overview</h2>
            <p className="details__overview">
              {movie.overview || "No description available."}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
