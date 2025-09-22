"use client";
import { useState } from "react";
import Parse from "../../lib/parse";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    try {
      await Parse.User.logIn(username, password);
      alert("Login realizado!");
      window.location.href = "/";
    } catch (error) {
      alert("Erro: " + error.message);
    }
  }

  return (
    <main style={{ padding: "20px" }}>
      <h1>Login</h1>
      <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "300px" }}>
        <input
          type="text"
          placeholder="Usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" style={{ padding: "10px", background: "#0070f3", color: "#fff", border: "none", borderRadius: "5px" }}>
          Entrar
        </button>
      </form>
    </main>
  );
}
