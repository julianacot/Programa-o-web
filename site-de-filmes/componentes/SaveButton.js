"use client";
import { useState } from "react";
import { saveFavorite } from "../lib/favoritos";

export default function SaveButton({ movie }) {
  const [saved, setSaved] = useState(false);

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
