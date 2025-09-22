import MovieRow from "../../componentes/MovieRow";
import { searchMovies } from "../../lib/tmdb";

export default async function SearchPage({ searchParams }) {
  const query = searchParams.query || ""; 
  let results = [];

  if (query) {
    try {
      results = await searchMovies(query, 4); 
    } catch (error) {
      console.error("Erro ao buscar filmes:", error);
    }
  }

  return (
    <main style={{ padding: "20px" }}>
      <h2 style={{ marginBottom: "20px", color: "#fff" }}>
        Resultados da busca: <em>{query}</em>
      </h2>

      {results.length > 0 ? (
        <MovieRow movies={results} />
      ) : (
        <p style={{ color: "#ccc" }}>
          {query ? "Nenhum filme encontrado." : "Digite algo na busca para pesquisar filmes."}
        </p>
      )}
    </main>
  );
}
