import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_POKEMON_BY_ID } from '../graphql/queries';
import { processPokemonData } from '../utils/pokemonUtils';
import { generateDynamicStyles, getTypeColors } from '../utils/pokemonColors';
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
  const dynamicStyles = generateDynamicStyles(processedPokemon);

  const handleFavoriteClick = () => {
    toggleFavorite(processedPokemon);
  };

  // Mapeo de estadísticas para mostrar nombres cortos
  const statNames = {
    'hp': 'HP',
    'attack': 'ATK',
    'defense': 'DEF',
    'special-attack': 'SATK',
    'special-defense': 'SDEF',
    'speed': 'SPD'
  };

  // Función para calcular el porcentaje de la barra de progreso
  const getStatPercentage = (statValue) => {
    return Math.min((statValue / 255) * 100, 100);
  };

  return (
    <div className="pokemon-detail-overlay" onClick={onClose}>
      <div className="pokemon-detail-modal" onClick={(e) => e.stopPropagation()} style={dynamicStyles}>
        
        <div className="pokemon-detail-content">
          {/* Header dinámico */}
          <div className="pokemon-detail-header">
            <button className="back-button" onClick={onClose}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <h1>{processedPokemon.name}</h1>
            <span className="pokemon-detail-number">#{processedPokemon.id.toString().padStart(3, '0')}</span>
          </div>
          
          {/* Sección de imagen con navegación */}
          <div className="pokemon-detail-image-section">
            
            <div className="pokemon-image-container">
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
          </div>
          
          {/* Badges de tipos */}
          <div className="pokemon-types-section">
            {processedPokemon.types.map((type, index) => {
              const typeColors = getTypeColors(type);
              return (
                <span 
                  key={index} 
                  className="type-badge"
                  style={{
                    backgroundColor: typeColors.primary,
                    color: typeColors.text
                  }}
                >
                  {type}
                </span>
              );
            })}
          </div>
          
          {/* Sección About */}
          <div className="about-section">
            <div className="section-separator"></div>
            <h3 className="section-title">About</h3>
            
            <div className="about-grid">
              <div className="about-item">
                <div className="about-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M3 3h18v18H3zM7 7h10v10H7z" stroke="currentColor" strokeWidth="2"/>
                    <path d="M9 9h6v6H9z" fill="currentColor"/>
                  </svg>
                </div>
                <div className="about-value">{processedPokemon.weight / 10} kg</div>
                <div className="about-label">Weight</div>
              </div>
              
              <div className="about-item">
                <div className="about-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2v20M2 12h20" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <div className="about-value">{processedPokemon.height / 10} m</div>
                <div className="about-label">Height</div>
              </div>
              
              <div className="about-item">
                <div className="about-value">Chlorophyll</div>
                <div className="about-label">Moves</div>
              </div>
            </div>
            
            <div className="pokemon-description">
              There is a plant seed on its back right from the day this Pokémon is born. The seed slowly grows larger.
            </div>
          </div>
          
          {/* Sección Base Stats */}
          <div className="base-stats-section">
            <div className="section-separator"></div>
            <h3 className="section-title">Base Stats</h3>
            
            <div className="stats-list">
              {Object.entries(processedPokemon.stats).map(([statName, statValue]) => {
                const shortName = statNames[statName] || statName.toUpperCase();
                const percentage = getStatPercentage(statValue);
                
                return (
                  <div key={statName} className="stat-item">
                    <div className="stat-name">{shortName}</div>
                    <div className="stat-value">{statValue.toString().padStart(3, '0')}</div>
                    <div className="stat-bar-container">
                      <div 
                        className="stat-bar-fill"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;
