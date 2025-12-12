import { Link } from "react-router-dom";
import { getPosterUrl } from "../api/tmdb";

const FALLBACK_POSTER =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="600"><rect width="100%" height="100%" fill="#222"/><text x="50%" y="50%" fill="#aaa" font-size="20" font-family="Arial" text-anchor="middle">No Poster</text></svg>`
  );

function formatDate(dateStr) {
  if (!dateStr) return "—";
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function MovieCard({ movie }) {
  const posterUrl = getPosterUrl(movie.poster_path, "w342") || FALLBACK_POSTER;
  const rating =
    typeof movie.vote_average === "number"
      ? movie.vote_average.toFixed(1)
      : "—";

  return (
    <Link
      to={`/movie/${movie.id}`}
      className="movieCard"
      aria-label={`View details for ${movie.title}`}
    >
      <img
        className="movieCard__poster"
        src={posterUrl}
        alt={movie.title || "Movie poster"}
        loading="lazy"
      />
      <div className="movieCard__body">
        <h3 className="movieCard__title">{movie.title}</h3>
        <div className="movieCard__meta">
          <span className="movieCard__date">
            {formatDate(movie.release_date)}
          </span>
          <span className="movieCard__rating">⭐ {rating}</span>
        </div>
      </div>
    </Link>
  );
}
