import React from 'react';
import { usePokemonFavorites } from '../context/PokemonFavoritesContext';
import './PokemonCard.css';

const PokemonCard = ({ pokemon, onSelect }) => {
  const { isFavorite, toggleFavorite } = usePokemonFavorites();

  const handleCardClick = () => {
    onSelect(pokemon);
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    toggleFavorite(pokemon);
  };

  return (
    <div className="pokemon-card" onClick={handleCardClick}>
      <div className="pokemon-image-container">
        {pokemon.image ? (
          <img 
            src={pokemon.image} 
            alt={pokemon.name}
            className="pokemon-image"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        ) : (
          <div className="no-image">No Image</div>
        )}
      </div>
      
      <div className="pokemon-info">
        <h3 className="pokemon-name">{pokemon.name}</h3>
        <div className="pokemon-types">
          {pokemon.types.map((type, index) => (
            <span key={index} className={`type-badge type-${type}`}>
              {type}
            </span>
          ))}
        </div>
        <p className="pokemon-id">#{pokemon.id}</p>
      </div>
      
      <button 
        className={`favorite-button ${isFavorite(pokemon.id) ? 'favorited' : ''}`}
        onClick={handleFavoriteClick}
        title={isFavorite(pokemon.id) ? 'Quitar de favoritos' : 'Agregar a favoritos'}
      >
        {isFavorite(pokemon.id) ? '❤️' : '🤍'}
      </button>
    </div>
  );
};

export default PokemonCard;
