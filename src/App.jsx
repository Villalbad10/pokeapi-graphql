import React, { useState } from 'react';
import { ApolloProvider } from '@apollo/client';
import { PokemonFavoritesProvider } from './context/PokemonFavoritesContext';
import PokemonList from './components/PokemonList';
import PokemonDetail from './components/PokemonDetail';
import client from './graphql/client';
import './App.css';

function App() {
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  const handlePokemonSelect = (pokemon) => {
    setSelectedPokemon(pokemon);
  };

  const handleCloseDetail = () => {
    setSelectedPokemon(null);
  };

  return (
    <ApolloProvider client={client}>
      <PokemonFavoritesProvider>
        <div className="app">
          <header className="app-header">
            <h1>Pokédex GraphQL</h1>
            <p>Explora el mundo de los Pokémon usando GraphQL</p>
          </header>
          
          <main className="app-main">
            <PokemonList onPokemonSelect={handlePokemonSelect} />
          </main>
          
          {selectedPokemon && (
            <PokemonDetail 
              pokemon={selectedPokemon} 
              onClose={handleCloseDetail} 
            />
          )}
        </div>
      </PokemonFavoritesProvider>
    </ApolloProvider>
  );
}

export default App;
