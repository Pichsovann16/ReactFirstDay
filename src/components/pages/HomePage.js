import { useEffect, useMemo, useState } from "react";
import MovieCard from "../movielist/MovieCard";
import SearchBar from "../navbar/SearchBar";
import { getPopularMovies } from "../api/tmdb";

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        setError(null);
        const data = await getPopularMovies({ page: 1 });
        if (!cancelled) setMovies(data?.results ?? []);
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
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return movies;
    return movies.filter((m) => (m.title || "").toLowerCase().includes(q));
  }, [movies, search]);

  return (
    <div className="page">
      <header className="header">
        <div className="header__inner">
          <h1 className="header__title">Movie DB</h1>
          <SearchBar value={search} onChange={setSearch} />
        </div>
      </header>

      <main className="container">
        {error ? (
          <div className="notice notice--error">
            <div className="notice__title">Could not load movies</div>
            <div className="notice__body">{error}</div>
          </div>
        ) : loading ? (
          <div className="notice">Loading movies…</div>
        ) : (
          <>
            <div className="resultsRow">
              <div className="resultsRow__count">
                Showing <b>{filtered.length}</b> / {movies.length}
              </div>
            </div>

            <section className="grid" aria-label="Movie results">
              {filtered.map((m) => (
                <MovieCard key={m.id} movie={m} />
              ))}
            </section>
          </>
        )}
      </main>
    </div>
  );
}
