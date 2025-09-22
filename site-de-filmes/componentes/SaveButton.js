"use client";
import { useState, useEffect } from "react";
import { saveFavorite, getFavorites, removeFavorite } from "../lib/favoritos";

export default function SaveButton({ movie }) {
  const [saved, setSaved] = useState(false);
   const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkIfSaved() {
      const favoritos = await getFavorites();
      const jaExiste = favoritos.some(fav => fav.id === movie.id);
      setSaved(jaExiste);
      setLoading(false);
    }
    checkIfSaved();
  }, [movie.id]);

  async function handleToggle() {
  if (loading) return; // evita clique antes de carregar estado inicial
  setLoading(true); // <-- desativa botão enquanto processa a ação

  if (saved) {
    // 🔄 Se já está salvo, remove
    const ok = await removeFavorite(movie.id);
    if (ok) setSaved(false);
    else alert("Erro ao remover favorito!");
  } else {
    // ➕ Se não está salvo, adiciona
    const ok = await saveFavorite(movie);
    if (ok) setSaved(true);
    else alert("Erro ao salvar favorito!");
  }

  setLoading(false); 
}


  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      style={{
        padding: "10px 20px",
        marginTop: "10px",
        background: saved ? "gray" : "red",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: loading ? "wait" : "pointer",
        opacity: loading ? 0.6 : 1,
      }}
    >
      {loading
    ? "Processando..."
    : saved
    ? "Remover dos Favoritos"
    : "Salvar nos Favoritos"}
</button>
  );
}
