// Utility function to process Pokemon data
export const processPokemonData = (pokemon) => {
  return {
    id: pokemon.id,
    name: pokemon.name,
    types: pokemon.pokemon_v2_pokemontypes?.map(type => type.pokemon_v2_type.name) || [],
    image: pokemon.pokemon_v2_pokemonsprites?.[0]?.sprites ? 
      JSON.parse(pokemon.pokemon_v2_pokemonsprites[0].sprites).front_default : 
      null,
    generation: pokemon.pokemon_v2_pokemonspecy?.pokemon_v2_generation?.name || 'Unknown',
    height: pokemon.height,
    weight: pokemon.weight,
    speciesId: pokemon.pokemon_species_id
  };
};

// Function to sort Pokemon alphabetically
export const sortPokemonAlphabetically = (pokemonList) => {
  return [...pokemonList].sort((a, b) => a.name.localeCompare(b.name));
};

// Function to get Pokemon image URL from sprites
export const getPokemonImageUrl = (sprites) => {
  if (!sprites) return null;
  
  try {
    const parsedSprites = JSON.parse(sprites);
    return parsedSprites.front_default || parsedSprites.front_shiny || null;
  } catch (error) {
    console.error('Error parsing sprites:', error);
    return null;
  }
};
