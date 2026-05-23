import React, { createContext, useContext, useState, useEffect } from 'react';

interface FavoriteMovie {
  id: string;
  title: string;
  poster: string;
}

interface FavoritesContextType {
  favorites: FavoriteMovie[];
  isFavorite: (id: string) => boolean;
  toggleFavorite: (movie: FavoriteMovie) => void;
  favoritesCount: number;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<FavoriteMovie[]>([]);

  useEffect(() => {
    const localData = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(localData);
  }, []);

  const isFavorite = (id: string) => {
    return favorites.some((item) => String(item.id) === String(id));
  };

  const toggleFavorite = (movie: FavoriteMovie) => {
    const index = favorites.findIndex((item) => String(item.id) === String(movie.id));
    let updated: FavoriteMovie[];

    if (index >= 0) {
      updated = favorites.filter((item) => String(item.id) !== String(movie.id));
    } else {
      updated = [...favorites, movie];
    }

    setFavorites(updated);
    localStorage.setItem('favorites', JSON.stringify(updated));
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        isFavorite,
        toggleFavorite,
        favoritesCount: favorites.length
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};