import React, { createContext, useContext, useState, useEffect } from 'react';

const PokemonFavoritesContext = createContext();

export const usePokemonFavorites = () => {
  const context = useContext(PokemonFavoritesContext);
  if (!context) {
    throw new Error('usePokemonFavorites must be used within a PokemonFavoritesProvider');
  }
  return context;
};

export const PokemonFavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  // Load favorites from localStorage on component mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem('pokemonFavorites');
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (error) {
        console.error('Error loading favorites from localStorage:', error);
      }
    }
  }, []);

  // Save favorites to localStorage whenever favorites change
  useEffect(() => {
    localStorage.setItem('pokemonFavorites', JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (pokemon) => {
    if (!favorites.find(fav => fav.id === pokemon.id)) {
      setFavorites(prev => [...prev, pokemon]);
    }
  };

  const removeFromFavorites = (pokemonId) => {
    setFavorites(prev => prev.filter(fav => fav.id !== pokemonId));
  };

  const isFavorite = (pokemonId) => {
    return favorites.some(fav => fav.id === pokemonId);
  };

  const toggleFavorite = (pokemon) => {
    if (isFavorite(pokemon.id)) {
      removeFromFavorites(pokemon.id);
    } else {
      addToFavorites(pokemon);
    }
  };

  const value = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    toggleFavorite
  };

  return (
    <PokemonFavoritesContext.Provider value={value}>
      {children}
    </PokemonFavoritesContext.Provider>
  );
};
