import React, { useState } from 'react';
import { ApolloProvider } from '@apollo/client';
import { PokemonFavoritesProvider } from './context/PokemonFavoritesContext';
import PokemonList from './components/PokemonList';
import PokemonDetail from './components/PokemonDetail';
import SortModal from './components/SortModal';
import FavoritesModal from './components/FavoritesModal';
import client from './graphql/client';
import searchIcon from './assets/img/search-icon.svg';
import pokeballIcon from './assets/img/pokeball-icon.svg';
import './App.css';

function App() {
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [showSortModal, setShowSortModal] = useState(false);
  const [showFavoritesModal, setShowFavoritesModal] = useState(false);
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

  const handleFavoritesClick = () => {
    setShowFavoritesModal(true);
  };

  const handleCloseFavoritesModal = () => {
    setShowFavoritesModal(false);
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
              <button 
                className="favorites-header-button"
                onClick={handleFavoritesClick}
                title="Ver favoritos"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
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
          
          <FavoritesModal
            isOpen={showFavoritesModal}
            onClose={handleCloseFavoritesModal}
            onPokemonSelect={handlePokemonSelect}
          />
        </div>
      </PokemonFavoritesProvider>
    </ApolloProvider>
  );
}

export default App;
