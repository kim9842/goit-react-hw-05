import { useParams, Link, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { getMovieDetails } from "../services/api";
import styles from "../pages/MovieDetailPage.module.css";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const location = useLocation();
  const backLink = useRef(location.state?.from || "/movies");
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    getMovieDetails(movieId)
      .then((res) => setMovie(res.data))
      .catch(console.error);
  }, [movieId]);

  if (!movie) return <div className={styles.container}>Loading...</div>;

  return (
    <div className={styles.container}>
      <Link to={backLink.current} className={styles.backLink}>
        ← Go back
      </Link>

      <div className={styles.movieHeader}>
        <div className={styles.moviePoster}>
          {movie.poster_path ? (
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
          ) : (
            <div className={styles.noPoster}>No poster available</div>
          )}
        </div>

        <div className={styles.movieInfo}>
          <h2>
            {movie.title}{" "}
            {movie.release_date && `(${movie.release_date.substring(0, 4)})`}
          </h2>

          <p className={styles.movieOverview}>
            {movie.overview || "No overview available."}
          </p>

          {movie.vote_average && (
            <p>
              User Score:{" "}
              <span className={styles.userScore}>
                {Math.round(movie.vote_average * 10)}%
              </span>
            </p>
          )}

          {movie.genres && movie.genres.length > 0 && (
            <p>
              Genres:{" "}
              <span className={styles.genresList}>
                {movie.genres.map((genre) => (
                  <span key={genre.id} className={styles.genrePill}>
                    {genre.name}
                  </span>
                ))}
              </span>
            </p>
          )}
        </div>
      </div>

      <nav>
        <Link to={`/movies/${movieId}/cast`}>Cast</Link>
        <Link to={`/movies/${movieId}/reviews`}>Reviews</Link>
      </nav>

      <Outlet />
    </div>
  );
}
