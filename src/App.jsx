import React, { useState } from 'react';
import { ApolloProvider } from '@apollo/client';
import { PokemonFavoritesProvider } from './context/PokemonFavoritesContext';
import PokemonList from './components/PokemonList';
import PokemonDetail from './components/PokemonDetail';
import SortModal from './components/SortModal';
import client from './graphql/client';
import searchIcon from './assets/img/search-icon.svg';
import pokeballIcon from './assets/img/pokeball-icon.svg';
import './App.css';

function App() {
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [showSortModal, setShowSortModal] = useState(false);
  const [sortBy, setSortBy] = useState('name');

  const handlePokemonSelect = (pokemon) => {
    setSelectedPokemon(pokemon);
  };

  const handleCloseDetail = () => {
    setSelectedPokemon(null);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterToggle = () => {
    setShowSortModal(true);
  };

  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy);
  };

  const handleCloseSortModal = () => {
    setShowSortModal(false);
  };

  return (
    <ApolloProvider client={client}>
      <PokemonFavoritesProvider>
        <div className="app">
          <header className="app-header">
            <div className="header-content">
              <div className="header-title">
                <img src={pokeballIcon} alt="Pokéball" className="pokeball-icon" />
                <h1>Pokédex</h1>
              </div>
            </div>
            
            <div className="search-container">
              <div className="search-input-container">
                <img src={searchIcon} alt="Search" className="search-icon" />
                <input
                  type="text"
                  className="search-bar"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
              <button 
                className="filter-button"
                onClick={handleFilterToggle}
                title="Filter"
              >
                {sortBy === 'name' ? 'A' : '#'}
              </button>
            </div>
          </header>
          
          <main className="app-main">
            <PokemonList 
              onPokemonSelect={handlePokemonSelect}
              searchTerm={searchTerm}
              showFilters={showFilters}
              sortBy={sortBy}
              onSortChange={handleSortChange}
            />
          </main>
          
          {selectedPokemon && (
            <PokemonDetail 
              pokemon={selectedPokemon} 
              onClose={handleCloseDetail} 
            />
          )}
          
          <SortModal
            isOpen={showSortModal}
            onClose={handleCloseSortModal}
            currentSort={sortBy}
            onSortChange={handleSortChange}
          />
        </div>
      </PokemonFavoritesProvider>
    </ApolloProvider>
  );
}

export default App;
