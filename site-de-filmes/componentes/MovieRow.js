"use client";
import MovieCard from "./MovieCard";
import "../styles/MovieRow.css";

export default function MovieRow({ movies }) {
  return (
    <div className="row">
      {movies?.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}