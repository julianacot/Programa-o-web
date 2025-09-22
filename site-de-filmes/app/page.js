import HeroMovie from "../componentes/HeroMovie";
import MovieRow from "../componentes/MovieRow";
import { getGenres, getMoviesByGenre, getMoviesByCategory } from "../lib/tmdb";

export default async function Home() {
  const topRated = await getMoviesByCategory("top_rated");
  const popular = await getMoviesByCategory("popular");
  const genres = await getGenres();

  const genresWithMovies = await Promise.all(
    genres.map(async (genre) => {
      const movies = await getMoviesByGenre(genre.id, 4);
      return { ...genre, movies };
    })
  );

  const heroMovie = topRated[0];

  const sectionStyle = {
    border: "2px solid #ff4d4d",
    borderRadius: "20px",
    padding: "20px",
    marginBottom: "30px",
    backgroundColor: "#1c1c1c",
  };

  return (
    <main>
      {heroMovie && <HeroMovie movie={heroMovie} />}

      <div style={{ padding: "20px" }}>
        {}
        <div style={sectionStyle}>
          <h2 style={{ marginBottom: "10px" }}> Melhores Filmes</h2>
          <MovieRow movies={topRated} />
        </div>

        {}
        <div style={sectionStyle}>
          <h2 style={{ marginBottom: "10px" }}> Filmes Populares</h2>
          <MovieRow movies={popular} />
        </div>

        {}
        {genresWithMovies.map(
          (genre) =>
            genre.movies.length > 0 && (
              <div key={genre.id} style={sectionStyle}>
                <h2 style={{ marginBottom: "10px" }}>{genre.name}</h2>
                <MovieRow movies={genre.movies} />
              </div>
            )
        )}
      </div>
    </main>
  );
}
