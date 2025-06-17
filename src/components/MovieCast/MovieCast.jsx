import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMovieCredits } from "../../services/api";
import styles from "./MovieCast.module.css";

export default function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    getMovieCredits(movieId)
      .then((res) => setCast(res.data.cast))
      .catch(console.error);
  }, [movieId]);

  return (
    <ul className={styles.list}>
      {cast.map((member) => (
        <li key={member.cast_id} className={styles.card}>
          <img
            src={
              member.profile_path
                ? `https://image.tmdb.org/t/p/w200${member.profile_path}`
                : "https://via.placeholder.com/100x150?text=No+Image"
            }
            alt={member.name}
            width={100}
          />
          <p>
            <b>{member.name}</b>
          </p>
          <p>{member.character}</p>
        </li>
      ))}
    </ul>
  );
}
