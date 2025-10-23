// Sistema de colores dinámico para tipos de Pokémon
export const POKEMON_TYPE_COLORS = {
  normal: {
    primary: '#A8A878',
    secondary: '#C4C4A0',
    light: '#E8E8D0',
    text: '#FFFFFF'
  },
  fire: {
    primary: '#F08030',
    secondary: '#F4A460',
    light: '#FFB366',
    text: '#FFFFFF'
  },
  water: {
    primary: '#6890F0',
    secondary: '#87CEEB',
    light: '#B0E0E6',
    text: '#FFFFFF'
  },
  electric: {
    primary: '#F8D030',
    secondary: '#FFD700',
    light: '#FFFF99',
    text: '#000000'
  },
  grass: {
    primary: '#78C850',
    secondary: '#98FB98',
    light: '#90EE90',
    text: '#FFFFFF'
  },
  ice: {
    primary: '#98D8D8',
    secondary: '#B0E0E6',
    light: '#E0FFFF',
    text: '#000000'
  },
  fighting: {
    primary: '#C03028',
    secondary: '#DC143C',
    light: '#FF6347',
    text: '#FFFFFF'
  },
  poison: {
    primary: '#A040A0',
    secondary: '#DA70D6',
    light: '#DDA0DD',
    text: '#FFFFFF'
  },
  ground: {
    primary: '#E0C068',
    secondary: '#F4A460',
    light: '#DEB887',
    text: '#000000'
  },
  flying: {
    primary: '#A890F0',
    secondary: '#DDA0DD',
    light: '#E6E6FA',
    text: '#FFFFFF'
  },
  psychic: {
    primary: '#F85888',
    secondary: '#FF69B4',
    light: '#FFB6C1',
    text: '#FFFFFF'
  },
  bug: {
    primary: '#A8B820',
    secondary: '#9ACD32',
    light: '#ADFF2F',
    text: '#FFFFFF'
  },
  rock: {
    primary: '#B8A038',
    secondary: '#CD853F',
    light: '#D2B48C',
    text: '#FFFFFF'
  },
  ghost: {
    primary: '#705898',
    secondary: '#9370DB',
    light: '#D8BFD8',
    text: '#FFFFFF'
  },
  dragon: {
    primary: '#7038F8',
    secondary: '#8A2BE2',
    light: '#BA55D3',
    text: '#FFFFFF'
  },
  dark: {
    primary: '#705848',
    secondary: '#A0522D',
    light: '#CD853F',
    text: '#FFFFFF'
  },
  steel: {
    primary: '#B8B8D0',
    secondary: '#C0C0C0',
    light: '#D3D3D3',
    text: '#000000'
  },
  fairy: {
    primary: '#EE99AC',
    secondary: '#FFB6C1',
    light: '#FFC0CB',
    text: '#000000'
  }
};

// Función para obtener colores del tipo principal del Pokémon
export const getPokemonColors = (pokemon) => {
  if (!pokemon || !pokemon.types || pokemon.types.length === 0) {
    return POKEMON_TYPE_COLORS.normal;
  }
  
  const primaryType = pokemon.types[0].toLowerCase();
  return POKEMON_TYPE_COLORS[primaryType] || POKEMON_TYPE_COLORS.normal;
};

// Función para obtener colores de un tipo específico
export const getTypeColors = (type) => {
  const normalizedType = type.toLowerCase();
  return POKEMON_TYPE_COLORS[normalizedType] || POKEMON_TYPE_COLORS.normal;
};

// Función para generar estilos CSS dinámicos
export const generateDynamicStyles = (pokemon) => {
  const colors = getPokemonColors(pokemon);
  
  return {
    '--pokemon-primary': colors.primary,
    '--pokemon-secondary': colors.secondary,
    '--pokemon-light': colors.light,
    '--pokemon-text': colors.text
  };
};
