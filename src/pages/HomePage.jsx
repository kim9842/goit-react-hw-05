import { useEffect, useState } from "react";
import { fetchTrendingMovies } from "../services/api";

import styles from "../pages/HomePage.module.css";
import MovieList from "../components/MovieList/MovieList";

export default function HomePage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchTrendingMovies()
      .then((res) => setMovies(res.data.results))
      .catch(console.error);
  }, []);

  return (
    <div className={styles.container}>
      <h1>Trending Today</h1>
      <MovieList movies={movies} />
    </div>
  );
}
