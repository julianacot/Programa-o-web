import { getMovieDetails, getMovieWatchProviders } from "../../../lib/tmdb";
import SaveButton from "../../../componentes/SaveButton";
import styles from "../../../styles/pageid.module.css";

export default async function MovieDetails({ params }) {
  const movie = await getMovieDetails(params.id);
  const providers = await getMovieWatchProviders(params.id);

  if (!movie) return <div>Filme não encontrado</div>;

  return (
    <main className={styles.container}>
      <div className={styles.posterWrapper}>
        <img
          className={styles.poster}
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
      </div>

      <div className={styles.info}>
        <h1>{movie.title}</h1>
        <p>{movie.overview}</p>
        <p>⭐ {movie.vote_average}</p>

        <SaveButton movie={movie} />

        {/* Onde assistir */}
        {providers ? (
          <div className={styles.providers}>
            <h3>Onde assistir:</h3>
            <div className={styles.providerList}>
              {}
              {providers.flatrate?.map((provider) => (
                <div key={provider.provider_id} className={styles.provider}>
                  <img
                    src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                    alt={provider.provider_name}
                    title={provider.provider_name}
                    className={styles.providerLogo}
                  />
                  <span>{provider.provider_name}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p>Informação de onde assistir não disponível.</p>
        )}

        {}
        {movie.trailerKey ? (
          <div className={styles.trailer}>
            <h3>Trailer Oficial</h3>
            <iframe
              width="100%"
              height="315"
              src={`https://www.youtube.com/embed/${movie.trailerKey}`}
              title="Trailer do filme"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        ) : (
          <p style={{ marginTop: "1rem" }}>Trailer não disponível.</p>
        )}
      </div>
    </main>
  );
}
