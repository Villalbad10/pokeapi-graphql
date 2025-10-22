import { gql } from '@apollo/client';

// Query to get all Pokemon with basic information
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
    }
  }
`;

// Query to get detailed Pokemon information by ID
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
    }
  }
`;
