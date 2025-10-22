import React, { useState, useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_POKEMON } from '../graphql/queries';
import { processPokemonData, sortPokemonAlphabetically } from '../utils/pokemonUtils';
import { usePokemonFavorites } from '../context/PokemonFavoritesContext';
import PokemonCard from './PokemonCard';
import './PokemonList.css';

const PokemonList = ({ onPokemonSelect, searchTerm, showFilters, sortBy, onSortChange }) => {
  const { loading, error, data } = useQuery(GET_ALL_POKEMON);
  const { favorites } = usePokemonFavorites();
  const [selectedType, setSelectedType] = useState('all');

  const pokemonList = useMemo(() => {
    if (!data?.pokemon_v2_pokemon) return [];
    
    const processedPokemon = data.pokemon_v2_pokemon.map(processPokemonData);
    let filteredPokemon = processedPokemon;

    // Filter by search term
    if (searchTerm) {
      filteredPokemon = filteredPokemon.filter(pokemon =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pokemon.id.toString().includes(searchTerm)
      );
    }

    // Filter by type
    if (selectedType !== 'all') {
      filteredPokemon = filteredPokemon.filter(pokemon =>
        pokemon.types.includes(selectedType)
      );
    }

    // Sort the filtered results
    if (sortBy === 'number') {
      return filteredPokemon.sort((a, b) => a.id - b.id);
    } else {
      return sortPokemonAlphabetically(filteredPokemon);
    }
  }, [data, searchTerm, selectedType, sortBy]);

  const allTypes = useMemo(() => {
    if (!data?.pokemon_v2_pokemon) return [];
    
    const types = new Set();
    data.pokemon_v2_pokemon.forEach(pokemon => {
      const processedPokemon = processPokemonData(pokemon);
      processedPokemon.types.forEach(type => types.add(type));
    });
    
    return Array.from(types).sort();
  }, [data]);

  if (loading) {
    return (
      <div className="pokemon-list-container">
        <div className="loading">
          <h2>Cargando Pokémon...</h2>
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pokemon-list-container">
        <div className="error">
          <h2>Error al cargar los Pokémon</h2>
          <p>{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pokemon-list-container">
      <div className="pokemon-list-header">
        <h2>Lista de Pokémon ({pokemonList.length})</h2>
        <p>Favoritos: {favorites.length}</p>
      </div>
      
      {showFilters && (
        <div className="filters-container">
          <div className="filter-group">
            <label htmlFor="type-filter">Filtrar por tipo:</label>
            <select
              id="type-filter"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="type-filter"
            >
              <option value="all">Todos los tipos</option>
              {allTypes.map(type => (
                <option key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
      
      <div className="pokemon-grid">
        {pokemonList.map((pokemon) => (
          <PokemonCard
            key={pokemon.id}
            pokemon={pokemon}
            onSelect={onPokemonSelect}
          />
        ))}
      </div>
      
      {pokemonList.length === 0 && searchTerm && (
        <div className="no-results">
          <p>No se encontraron Pokémon que coincidan con "{searchTerm}"</p>
        </div>
      )}
    </div>
  );
};

export default PokemonList;
