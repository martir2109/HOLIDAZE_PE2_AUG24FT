import { useState } from "react";

/**
 * Manages the user's favorite venues using localStorage.
 * Favorites persist between page refresh.
 *
 * @returns favorites - The list of favorited venue IDs
 * @returns toggleFavorite - Adds or remove a venue from favorites
 * @returns isFavorited - Checks if venue is favorited
 */
export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  function toggleFavorite(venueId: string) {
    setFavorites((prev) => {
      const updated = prev.includes(venueId)
        ? prev.filter((id) => id !== venueId)
        : [...prev, venueId];
      localStorage.setItem("favorites", JSON.stringify(updated));
      return updated;
    });
  }

  function isFavorited(venueId: string) {
    return favorites.includes(venueId);
  }

  return { favorites, toggleFavorite, isFavorited };
}
