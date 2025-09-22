import Link from "next/link";
import styles from "../styles/MovieCard.module.css";

export default function MovieCard({ movie }) {
  return (
    <div className={styles.card}>
      <Link href={`/movie/${movie.id}`} className={styles.cardLink}>
        <img
          src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
          alt={movie.title}
        />
        <h3>{movie.title}</h3>
      </Link>
    </div>
  );
}
