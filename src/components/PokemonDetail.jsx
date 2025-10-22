import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_POKEMON_BY_ID } from '../graphql/queries';
import { processPokemonData } from '../utils/pokemonUtils';
import { usePokemonFavorites } from '../context/PokemonFavoritesContext';
import './PokemonDetail.css';

const PokemonDetail = ({ pokemon, onClose }) => {
  const { loading, error, data } = useQuery(GET_POKEMON_BY_ID, {
    variables: { id: pokemon.id },
    skip: !pokemon.id
  });

  const { isFavorite, toggleFavorite } = usePokemonFavorites();

  if (loading) {
    return (
      <div className="pokemon-detail-overlay" onClick={onClose}>
        <div className="pokemon-detail-modal" onClick={(e) => e.stopPropagation()}>
          <div className="loading">
            <h2>Cargando detalles...</h2>
            <div className="spinner"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pokemon-detail-overlay" onClick={onClose}>
        <div className="pokemon-detail-modal" onClick={(e) => e.stopPropagation()}>
          <div className="error">
            <h2>Error al cargar los detalles</h2>
            <p>{error.message}</p>
            <button onClick={onClose} className="close-button">Cerrar</button>
          </div>
        </div>
      </div>
    );
  }

  const pokemonData = data?.pokemon_v2_pokemon_by_pk;
  const processedPokemon = pokemonData ? processPokemonData(pokemonData) : pokemon;

  const handleFavoriteClick = () => {
    toggleFavorite(processedPokemon);
  };

  return (
    <div className="pokemon-detail-overlay" onClick={onClose}>
      <div className="pokemon-detail-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>×</button>
        
        <div className="pokemon-detail-content">
          <div className="pokemon-detail-image">
            {processedPokemon.image ? (
              <img 
                src={processedPokemon.image} 
                alt={processedPokemon.name}
                className="detail-image"
              />
            ) : (
              <div className="no-image-large">No Image Available</div>
            )}
          </div>
          
          <div className="pokemon-detail-info">
            <div className="detail-header">
              <h1 className="detail-name">{processedPokemon.name}</h1>
              <button 
                className={`favorite-button-large ${isFavorite(processedPokemon.id) ? 'favorited' : ''}`}
                onClick={handleFavoriteClick}
                title={isFavorite(processedPokemon.id) ? 'Quitar de favoritos' : 'Agregar a favoritos'}
              >
                {isFavorite(processedPokemon.id) ? '❤️' : '🤍'}
              </button>
            </div>
            
            <div className="detail-section">
              <h3>Información Básica</h3>
              <div className="detail-grid">
                <div className="detail-item">
                  <span className="detail-label">Número:</span>
                  <span className="detail-value">#{processedPokemon.id}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Generación:</span>
                  <span className="detail-value">{processedPokemon.generation}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Altura:</span>
                  <span className="detail-value">{processedPokemon.height / 10} m</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Peso:</span>
                  <span className="detail-value">{processedPokemon.weight / 10} kg</span>
                </div>
              </div>
            </div>
            
            <div className="detail-section">
              <h3>Tipos</h3>
              <div className="pokemon-types">
                {processedPokemon.types.map((type, index) => (
                  <span key={index} className={`type-badge type-${type}`}>
                    {type}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;
