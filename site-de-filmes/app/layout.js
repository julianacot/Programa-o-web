import "./globals.css";
import Navbar from "../componentes/Navbar";

export const metadata = {
  title: "My Movies App",
  description: "App de filmes com Next.js + Back4App + TMDb",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body style={{ margin: 0, fontFamily: "sans-serif" }}>
        <Navbar />
        <div style={{ padding: "20px" }}>{children}</div>
      </body>
    </html>
  );
}
