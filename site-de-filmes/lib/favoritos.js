"use client";
import Parse from "./parse";

export async function saveFavorite(movie) {
  const Favorite = Parse.Object.extend("Favorite");
  try {
    
    const query = new Parse.Query(Favorite);
    query.equalTo("user", Parse.User.current());
    query.equalTo("movieId", movie.id);
    const existing = await query.first();

    if (existing) {
      console.log("Filme já está nos favoritos");
      return false;
    }
  const favorite = new Favorite();

  favorite.set("user", Parse.User.current());
  favorite.set("movieId", movie.id);
  favorite.set("title", movie.title);
  favorite.set("posterPath", movie.poster_path);

  
    await favorite.save();
    return true;
  } catch (error) {
    console.error("Erro ao salvar favorito:", error);
    return false;
  }
}

export async function getFavorites() {
  const Favorite = Parse.Object.extend("Favorite");
  const query = new Parse.Query(Favorite);

  query.equalTo("user", Parse.User.current());

  try {
    const results = await query.find();
    return results.map((fav) => ({
      id: fav.get("movieId"),
      title: fav.get("title"),
      posterPath: fav.get("posterPath"),
    }));
  } catch (error) {
    console.error("Erro ao buscar favoritos:", error);
    return [];
  }
}

export async function removeFavorite(movieId) {
  const Favorite = Parse.Object.extend("Favorite");
  const query = new Parse.Query(Favorite);

  query.equalTo("user", Parse.User.current());
  query.equalTo("movieId", movieId);

  try {
    const result = await query.first();
    if (result) {
      await result.destroy();
      return true;
    }
    return false; // não achou favorito para remover
  } catch (error) {
    console.error("Erro ao remover favorito:", error);
    return false;
  }
}
