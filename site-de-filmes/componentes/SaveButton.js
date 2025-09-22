"use client";
import { useState, useEffect } from "react";
import { saveFavorite, getFavorites } from "../lib/favoritos";

export default function SaveButton({ movie }) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    async function checkIfSaved() {
      const favoritos = await getFavorites();
      const jaExiste = favoritos.some(fav => fav.id === movie.id);
      if (jaExiste) setSaved(true);
    }
    checkIfSaved();
  }, [movie.id]);

  async function handleSave() {
    const ok = await saveFavorite(movie);
    if (ok) setSaved(true);
    else alert("Erro ao salvar favorito");
  }

  return (
    <button
      onClick={handleSave}
      disabled={saved}
      style={{
        padding: "10px 20px",
        marginTop: "10px",
        background: saved ? "gray" : "red",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: saved ? "default" : "pointer",
      }}
    >
      {saved ? "Salvo nos Favoritos" : "Salvar nos Favoritos"}
    </button>
  );
}
