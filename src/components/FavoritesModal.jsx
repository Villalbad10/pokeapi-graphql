import React from 'react';
import { usePokemonFavorites } from '../context/PokemonFavoritesContext';
import PokemonCard from './PokemonCard';
import './FavoritesModal.css';

const FavoritesModal = ({ isOpen, onClose, onPokemonSelect }) => {
  const { favorites, removeFromFavorites } = usePokemonFavorites();

  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handlePokemonClick = (pokemon) => {
    onPokemonSelect(pokemon);
    onClose();
  };

  const handleRemoveFavorite = (pokemonId, e) => {
    e.stopPropagation();
    removeFromFavorites(pokemonId);
  };

  return (
    <div className="favorites-modal-overlay" onClick={handleOverlayClick}>
      <div className="favorites-modal">
        <div className="favorites-modal-header">
          <h2>Mis Pokémon Favoritos</h2>
          <button className="close-button" onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        
        <div className="favorites-modal-content">
          {favorites.length === 0 ? (
            <div className="no-favorites">
              <div className="no-favorites-icon">❤️</div>
              <h3>No tienes Pokémon favoritos</h3>
              <p>Agrega algunos Pokémon a tus favoritos para verlos aquí</p>
            </div>
          ) : (
            <>
              <div className="favorites-count">
                <span>{favorites.length} Pokémon favorito{favorites.length !== 1 ? 's' : ''}</span>
              </div>
              
              <div className="favorites-grid">
                {favorites.map((pokemon) => (
                  <div key={pokemon.id} className="favorite-item" onClick={() => handlePokemonClick(pokemon)}>
                    <div className="favorite-image">
                      {pokemon.image ? (
                        <img 
                          src={pokemon.image} 
                          alt={pokemon.name}
                          className="favorite-pokemon-image"
                        />
                      ) : (
                        <div className="no-image-small">?</div>
                      )}
                    </div>
                    
                    <div className="favorite-info">
                      <h4 className="favorite-name">{pokemon.name}</h4>
                      <span className="favorite-number">#{pokemon.id.toString().padStart(3, '0')}</span>
                    </div>
                    
                    <button 
                      className="remove-favorite-button"
                      onClick={(e) => handleRemoveFavorite(pokemon.id, e)}
                      title="Quitar de favoritos"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FavoritesModal;
