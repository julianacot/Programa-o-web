"use client";
import MovieCard from "./MovieCard";
import "../styles/MovieRow.css";

export default function MovieRow({ movies }) {

  const uniqueMovies = movies?.filter(
    (movie, index, self) =>
      index === self.findIndex((m) => m.id === movie.id)
  );

  return (
    <div className="row">
      {uniqueMovies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}
