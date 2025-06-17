import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMovieReviews } from "../../services/api";
import styles from "./MovieReviews.module.css";

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getMovieReviews(movieId)
      .then((res) => setReviews(res.data.results))
      .catch(console.error);
  }, [movieId]);

  return (
    <ul className={styles.list}>
      {reviews.length === 0 && <li>No reviews</li>}
      {reviews.map((review) => (
        <li key={review.id}>
          <p>
            <b>{review.author}</b>
          </p>
          <p>{review.content}</p>
        </li>
      ))}
    </ul>
  );
}
