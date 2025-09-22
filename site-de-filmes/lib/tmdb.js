const API_KEY = "3541c74b87a9455552fa5ae4c33578bd";
const BASE_URL = "https://api.themoviedb.org/3";

// --------------------
// Buscar filmes por categoria (popular, top_rated, upcoming, now_playing)
// --------------------
export async function getMoviesByCategory(category, pages = 1) {
  let movies = [];

  for (let i = 1; i <= pages; i++) {
    const res = await fetch(
      `${BASE_URL}/movie/${category}?api_key=${API_KEY}&language=pt-BR&page=${i}`,
      { next: { revalidate: 3600 } }
    );
    const data = await res.json();
    movies = movies.concat(data.results);
  }

  return movies;
}

// --------------------
// Buscar filmes por gênero (ex: 28 = Ação, 35 = Comédia)
// --------------------
export async function getMoviesByGenre(genreId, pages = 1) {
  let movies = [];

  for (let i = 1; i <= pages; i++) {
    const res = await fetch(
      `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=pt-BR&with_genres=${genreId}&page=${i}`,
      { next: { revalidate: 3600 } }
    );
    const data = await res.json();
    movies = movies.concat(data.results);
  }

  return movies;
}

// --------------------
// Buscar lista de gêneros disponíveis
// --------------------
export async function getGenres() {
  const res = await fetch(
    `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=pt-BR`,
    { next: { revalidate: 86400 } } // atualiza a cada 24h
  );

  if (!res.ok) {
    throw new Error("Erro ao carregar gêneros");
  }

  const data = await res.json();
  return data.genres; // retorna array [{id: 28, name: "Ação"}, ...]
}

// --------------------
// Buscar detalhes de um filme
// --------------------
export async function getMovieDetails(id) {
  // Buscar detalhes do filme
  const res = await fetch(
    `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=pt-BR`
  );

  if (!res.ok) {
    throw new Error("Erro ao buscar detalhes do filme");
  }

  const movie = await res.json();

  // Buscar vídeos relacionados ao filme (trailers, clipes etc.)
  const videosRes = await fetch(
    `${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}&language=pt-BR`
  );

  const videosData = await videosRes.json();

  // Procurar um vídeo do tipo "Trailer" no YouTube
  const trailer = videosData.results.find(
    (video) => video.type === "Trailer" && video.site === "YouTube"
  );

  return {
    ...movie,
    trailerKey: trailer?.key || null, // adiciona a chave do vídeo do YouTube
  };
}
export async function getMovieWatchProviders(id) {

  const res = await fetch(
    `${BASE_URL}/movie/${id}/watch/providers?api_key=${API_KEY}`
  );

  if (!res.ok) {
    return null;
  }

  const data = await res.json();

  // Retorna apenas os provedores para o Brasil ("BR")
  return data.results?.BR || null;
 };


