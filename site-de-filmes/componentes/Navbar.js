"use client";
import { useState, useEffect } from "react";
import Parse from "../lib/parse";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaSearch } from "react-icons/fa"; 

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);

  const [searchTerm, setSearchTerm] = useState(""); // estado da busca
  const router = useRouter();

  useEffect(() => {
    setUser(Parse.User.current());
  }, []);

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const loggedUser = await Parse.User.logIn(username, password);
      setUser(loggedUser);
      setUsername("");
      setPassword("");
      alert("Login realizado!");
    } catch (error) {
      alert("Erro ao fazer login: " + error.message);
    }
  }

  async function handleRegister(e) {
    e.preventDefault();
    try {
      const newUser = new Parse.User();
      newUser.set("username", username);
      newUser.set("password", password);
      await newUser.signUp();
      setUser(newUser);
      setUsername("");
      setPassword("");
      alert("Conta criada com sucesso!");
    } catch (error) {
      alert("Erro ao registrar: " + error.message);
    }
  }

  async function handleLogout() {
    await Parse.User.logOut();
    setUser(null);
  }

  function handleSearch(e) {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    router.push(`/pesquisa?query=${encodeURIComponent(searchTerm)}`);
    setSearchTerm("");
  }

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        background: "#111",
        color: "#fff",
      }}
    >
      {/* Links */}
      <div style={{ display: "flex", gap: "15px" }}>
        <Link href="/" style={{ color: "white", textDecoration: "none" }}>
          Home
        </Link>
        <Link href="/favorites" style={{ color: "white", textDecoration: "none" }}>
          Favoritos
        </Link>
      </div>

      {/* Busca */}
      <form
        onSubmit={handleSearch}
        style={{ display: "flex", alignItems: "center", gap: "5px" }}
      >
        <input
          type="text"
          placeholder="Buscar filmes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: "6px 10px",
            borderRadius: "20px",
            border: "1px solid #444",
            background: "#222",
            color: "#fff",
          }}
        />
        <button
          type="submit"
          style={{
            background: "transparent",
            border: "none",
            cursor: "pointer",
            color: "white",
            fontSize: "18px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <FaSearch />
        </button>
      </form>

      {}
      <div>
        {user ? (
          <>
            <span style={{ marginRight: "10px" }}>👤 {user.get("username")}</span>
            <button
              onClick={handleLogout}
              style={{
                background: "red",
                color: "white",
                border: "none",
                padding: "6px 12px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Sair
            </button>
          </>
        ) : (
          <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
            <form
              onSubmit={isRegister ? handleRegister : handleLogin}
              style={{ display: "flex", gap: "5px", alignItems: "center" }}
            >
              <input
                type="text"
                placeholder="Usuário"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{ padding: "4px 8px", borderRadius: "4px", border: "1px solid #ccc" }}
                required
              />
              <input
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ padding: "4px 8px", borderRadius: "4px", border: "1px solid #ccc" }}
                required
              />
              <button
                type="submit"
                style={{
                  background: "#0070f3",
                  color: "white",
                  border: "none",
                  padding: "6px 12px",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                {isRegister ? "Registrar" : "Entrar"}
              </button>
            </form>
            <button
              onClick={() => setIsRegister(!isRegister)}
              style={{
                background: "transparent",
                color: "#fff",
                border: "none",
                cursor: "pointer",
                textDecoration: "underline",
                marginLeft: "5px",
              }}
            >
              {isRegister ? "Login" : "Registrar"}
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
