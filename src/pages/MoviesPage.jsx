import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchMovies } from "../services/api";
import MovieList from "../components/MovieList/MovieList";
import styles from "./MoviesPage.module.css";

export default function MoviesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const [movies, setMovies] = useState([]);
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    if (!query) {
      setMovies([]);
      setNoResults(false);
      return;
    }

    searchMovies(query)
      .then((res) => {
        setMovies(res.data.results);
        setNoResults(res.data.results.length === 0);
      })
      .catch((error) => {
        console.error(error);
        setMovies([]);
        setNoResults(true);
      });
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = e.target.elements.query.value.trim();
    if (value) {
      setSearchParams({ query: value });
      setNoResults(false);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <input type="text" name="query" defaultValue={query} />
        <button type="submit">Search</button>
      </form>
      {noResults ? <p>Movie not found</p> : <MovieList movies={movies} />}
    </div>
  );
}
