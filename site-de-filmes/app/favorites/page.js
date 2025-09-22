"use client";
import { useEffect, useState } from "react";
import { getFavorites } from "../../lib/favoritos";
import Link from "next/link";
import Parse from "../../lib/parse";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!Parse.User.current()) {
      alert("Você precisa estar logado para ver os favoritos.");
      window.location.href = "/";
      return;
    }
    async function loadFavorites() {
      const favs = await getFavorites();
      setFavorites(favs);
      setLoading(false);
    }
    loadFavorites();
  }, []);

  if (loading) return <p>Carregando favoritos...</p>;

  return (
    <main>
      <h1>⭐ Meus Favoritos</h1>
      {favorites.length === 0 ? (
        <p>Você ainda não salvou nenhum filme.</p>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
          {favorites.map((movie) => (
            <div
              key={movie.id}
              style={{
                width: "200px",
                border: "1px solid #ddd",
                borderRadius: "8px",
                textAlign: "center",
              }}
            >
              <Link href={`/movie/${movie.id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w300${movie.posterPath}`}
                  alt={movie.title}
                  style={{ width: "100%" }}
                />
                <h3>{movie.title}</h3>
              </Link>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
