import HeroMovie from "../componentes/HeroMovie";
import MovieRow from "../componentes/MovieRow";
import { getGenres, getMoviesByGenre, getMoviesByCategory } from "../lib/tmdb";

export default async function Home() {
  // Categorias fixas
  const topRated = await getMoviesByCategory("top_rated");
  const popular = await getMoviesByCategory("popular");

  // Lista de gêneros disponíveis
  const genres = await getGenres();

  // Para cada gênero, buscar alguns filmes (exemplo: só a primeira página)
  const genresWithMovies = await Promise.all(
    genres.map(async (genre) => {
      const movies = await getMoviesByGenre(genre.id, 1);
      return { ...genre, movies };
    })
  );

  // Hero Movie: destaque o primeiro filme top rated
  const heroMovie = topRated[0];

  return (
    <main>
      {/* Poster de destaque */}
      {heroMovie && <HeroMovie movie={heroMovie} />}

      <div style={{ padding: "20px" }}>
        <h2>🎬 Melhores Filmes</h2>
        <MovieRow movies={topRated} />

        <h2>🔥 Filmes Populares</h2>
        <MovieRow movies={popular} />

        {genresWithMovies.map(
          (genre) =>
            genre.movies.length > 0 && (
              <div key={genre.id}>
                <h2>{genre.name}</h2>
                <MovieRow movies={genre.movies} />
              </div>
            )
        )}
      </div>
    </main>
  );
}
