// Función utilitaria para procesar datos de Pokémon
export const processPokemonData = (pokemon) => {
  // Procesar estadísticas base
  const stats = {};
  if (pokemon.pokemon_v2_pokemonstats) {
    pokemon.pokemon_v2_pokemonstats.forEach(stat => {
      const statName = stat.pokemon_v2_stat.name;
      stats[statName] = stat.base_stat;
    });
  }

  // Obtener imagen de dream_world con fallback
  let image = null;
  if (pokemon.pokemon_v2_pokemonsprites?.[0]?.sprites) {
    const sprites = pokemon.pokemon_v2_pokemonsprites[0].sprites;
    
    // Intentar obtener dream_world/front_default primero
    if (sprites.other?.dream_world?.front_default) {
      image = sprites.other.dream_world.front_default;
    }
    // Fallback a front_default si no hay dream_world
    else if (sprites.front_default) {
      image = sprites.front_default;
    }
  }

  return {
    id: pokemon.id,
    name: pokemon.name,
    types: pokemon.pokemon_v2_pokemontypes?.map(type => type.pokemon_v2_type.name) || [],
    image: image,
    generation: pokemon.pokemon_v2_pokemonspecy?.pokemon_v2_generation?.name || 'Unknown',
    height: pokemon.height,
    weight: pokemon.weight,
    speciesId: pokemon.pokemon_species_id,
    stats: stats
  };
};

// Función para ordenar Pokémon alfabéticamente
export const sortPokemonAlphabetically = (pokemonList) => {
  return [...pokemonList].sort((a, b) => a.name.localeCompare(b.name));
};

// Función para obtener URL de imagen de Pokémon desde sprites
export const getPokemonImageUrl = (sprites) => {
  if (!sprites) return null;
  
  try {
    const parsedSprites = JSON.parse(sprites);
    
    // Intentar obtener dream_world/front_default primero
    if (parsedSprites.other?.dream_world?.front_default) {
      return parsedSprites.other.dream_world.front_default;
    }
    // Fallback a front_default si no hay dream_world
    else if (parsedSprites.front_default) {
      return parsedSprites.front_default;
    }
    // Fallback a front_shiny si no hay front_default
    else if (parsedSprites.front_shiny) {
      return parsedSprites.front_shiny;
    }
    
    return null;
  } catch (error) {
    console.error('Error parsing sprites:', error);
    return null;
  }
};
