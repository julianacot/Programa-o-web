import Link from "next/link";
import styles from "../styles/HeroMovie.module.css";

export default function HeroMovie({ movie }) {
  if (!movie) return null;

  const imageUrl = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;

  return (
    <Link href={`/movie/${movie.id}`} className={styles.heroLink}>
      <div
        className={styles.hero}
        style={{ backgroundImage: `url(${imageUrl})` }}
      >
        <div className={styles.topLabel}>🎖 Filme Melhor Avaliado</div>
        <div className={styles.content}>
          <h1>{movie.title}</h1>
        </div>
      </div>
    </Link>
  );
}
