import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_POKEMON } from '../graphql/queries';
import { processPokemonData, sortPokemonAlphabetically } from '../utils/pokemonUtils';
import { usePokemonFavorites } from '../context/PokemonFavoritesContext';
import PokemonCard from './PokemonCard';
import './PokemonList.css';

const PokemonList = ({ onPokemonSelect }) => {
  const { loading, error, data } = useQuery(GET_ALL_POKEMON);
  const { favorites } = usePokemonFavorites();

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

  const pokemonList = data?.pokemon_v2_pokemon || [];
  const processedPokemon = pokemonList.map(processPokemonData);
  const sortedPokemon = sortPokemonAlphabetically(processedPokemon);

  return (
    <div className="pokemon-list-container">
      <div className="pokemon-list-header">
        <h2>Lista de Pokémon ({sortedPokemon.length})</h2>
        <p>Favoritos: {favorites.length}</p>
      </div>
      
      <div className="pokemon-grid">
        {sortedPokemon.map((pokemon) => (
          <PokemonCard
            key={pokemon.id}
            pokemon={pokemon}
            onSelect={onPokemonSelect}
          />
        ))}
      </div>
    </div>
  );
};

export default PokemonList;
