"use client";
import { useRef } from "react";
import MovieCard from "./MovieCard";
import "../styles/MovieRow.css";

export default function MovieRow({ movies }) {
  const rowRef = useRef(null);

  const uniqueMovies = movies?.filter(
    (movie, index, self) =>
      index === self.findIndex((m) => m.id === movie.id)
  );

  const scroll = (direction) => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollAmount = direction === "left" ? -clientWidth : clientWidth;
      rowRef.current.scrollTo({
        left: scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="movieRowWrapper">
      <button className="scrollBtn left" onClick={() => scroll("left")}>
        ◀
      </button>
      <div className="row" ref={rowRef}>
        {uniqueMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      <button className="scrollBtn right" onClick={() => scroll("right")}>
        ▶
      </button>
    </div>
  );
}
