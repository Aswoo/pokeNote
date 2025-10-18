import axios from 'axios';
import type {
  Pokemon,
  PokemonListResponse,
  PokemonSpecies,
  PokemonSpeciesDetails,
  EvolutionChain,
  PokemonWithDamageRelations,
  TypeDetails,
  GenerationListItem,
  GenerationListResponse
} from '../types/pokemon';

const API_BASE_URL = 'https://pokeapi.co/api/v2';


export const getPokemonList = async (
  offset: number = 0,
  limit: number = 20,
  generationId?: number
): Promise<PokemonListResponse> => {
  const url = `${API_BASE_URL}/pokemon?offset=${offset}&limit=${limit}`;

  if (generationId && !isNaN(generationId)) {
    const generationResponse = await axios.get(`${API_BASE_URL}/generation/${generationId}`);
    const pokemonSpecies: PokemonSpecies[] = generationResponse.data.pokemon_species;
    const paginatedSpecies = pokemonSpecies.slice(offset, offset + limit);

    const pokemonUrls = paginatedSpecies.map((species: PokemonSpecies) => {
      let id = '1'; // default fallback
      if (species.url) {
        id = species.url.split('/').slice(-2, -1)[0];
      } else {
        console.error('Species URL is undefined:', species);
      }
      return `${API_BASE_URL}/pokemon/${id}/`;
    });

    const detailedPokemonPromises = pokemonUrls.map((url: string) => axios.get(url));
    const detailedPokemonResponses = await Promise.all(detailedPokemonPromises);

    return {
      count: pokemonSpecies.length,
      next: offset + limit < pokemonSpecies.length ? 'true' : null,
      previous: offset > 0 ? 'true' : null,
      results: detailedPokemonResponses.map((res) => {
        const pokemonId = res.data.species.url.split('/').slice(-2, -1)[0];
        return {
          name: res.data.name,
          url: `${API_BASE_URL}/pokemon/${pokemonId}/`,
        };
      }),
    };
  }

  const response = await axios.get<PokemonListResponse>(url);
  return response.data;
};

export const getPokemonDetails = async (nameOrId: string | number): Promise<Pokemon> => {
  const response = await axios.get<Pokemon>(`${API_BASE_URL}/pokemon/${nameOrId}`);
  return response.data;
};

export const getPokemonDetailsWithDamageRelations = async (nameOrId: string | number): Promise<PokemonWithDamageRelations> => {
  // 1. Get basic pokemon details
  const pokemon = await getPokemonDetails(nameOrId);

  // 2. Fetch details for each of the Pokémon's types
  const typeDetailsPromises = pokemon.types.map(t => axios.get<TypeDetails>(t.type.url));
  const typeDetailsResponses = await Promise.all(typeDetailsPromises);
  const typesData = typeDetailsResponses.map(res => res.data);

  // 3. Get a list of all types to calculate relations against
  const allTypesResponse = await axios.get<{ results: { name: string }[] }>(`${API_BASE_URL}/type`);
  const allTypeNames = allTypesResponse.data.results.map(t => t.name);

  // 4. Calculate combined damage relations
  const damageMultipliers: { [key: string]: number } = {};

  allTypeNames.forEach(attackingType => {
    let multiplier = 1;
    typesData.forEach(defendingType => {
      if (defendingType.damage_relations.double_damage_from.some(t => t.name === attackingType)) {
        multiplier *= 2;
      }
      if (defendingType.damage_relations.half_damage_from.some(t => t.name === attackingType)) {
        multiplier *= 0.5;
      }
      if (defendingType.damage_relations.no_damage_from.some(t => t.name === attackingType)) {
        multiplier *= 0;
      }
    });
    damageMultipliers[attackingType] = multiplier;
  });

  const weaknesses: { name: string, multiplier: number }[] = [];
  const resistances: { name: string, multiplier: number }[] = [];
  const immunities: string[] = [];

  for (const type in damageMultipliers) {
    const multiplier = damageMultipliers[type];
    if (multiplier > 1) {
      weaknesses.push({ name: type, multiplier });
    } else if (multiplier < 1 && multiplier > 0) {
      resistances.push({ name: type, multiplier });
    } else if (multiplier === 0) {
      immunities.push(type);
    }
  }

  return {
    ...pokemon,
    damageRelations: {
      weaknesses,
      resistances,
      immunities,
    },
  };
};


export const getPokemonSpecies = async (nameOrId: string | number): Promise<PokemonSpeciesDetails> => {
  const response = await axios.get<PokemonSpeciesDetails>(`${API_BASE_URL}/pokemon-species/${nameOrId}`);
  return response.data;
};

export const getEvolutionChain = async (url: string): Promise<EvolutionChain> => {
  const response = await axios.get<EvolutionChain>(url);
  return response.data;
};

export const getPokemonByUrl = async <T>(url: string): Promise<T> => {
  const response = await axios.get<T>(url);
  return response.data;
};

export interface GenerationListItem {
  name: string;
  url: string;
}

export interface GenerationListResponse {
  count: number;
  results: GenerationListItem[];
}

export const getGenerations = async (): Promise<GenerationListResponse> => {
  const response = await axios.get<GenerationListResponse>(`${API_BASE_URL}/generation`);
  return response.data;
};