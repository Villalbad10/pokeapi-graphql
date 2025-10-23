import { gql } from '@apollo/client';

// Consulta para obtener todos los Pokémon con información básica
export const GET_ALL_POKEMON = gql`
  query GetAllPokemon {
    pokemon_v2_pokemon(limit: 1000) {
      id
      name
      pokemon_v2_pokemontypes {
        pokemon_v2_type {
          name
        }
      }
      pokemon_v2_pokemonsprites {
        sprites
      }
      pokemon_species_id
      height
      weight
      pokemon_v2_pokemonspecy {
        pokemon_v2_generation {
          name
        }
      }
      pokemon_v2_pokemonstats {
        base_stat
        pokemon_v2_stat {
          name
        }
      }
    }
  }
`;

// Consulta para obtener información detallada de Pokémon por ID
export const GET_POKEMON_BY_ID = gql`
  query GetPokemonById($id: Int!) {
    pokemon_v2_pokemon_by_pk(id: $id) {
      id
      name
      pokemon_v2_pokemontypes {
        pokemon_v2_type {
          name
        }
      }
      pokemon_v2_pokemonsprites {
        sprites
      }
      pokemon_species_id
      height
      weight
      pokemon_v2_pokemonspecy {
        pokemon_v2_generation {
          name
        }
      }
      pokemon_v2_pokemonstats {
        base_stat
        pokemon_v2_stat {
          name
        }
      }
    }
  }
`;
