import axios from 'axios';

const API_BASE_URL = 'https://pokeapi.co/api/v2';

export interface PokemonListItem {
  name: string;
  url: string;
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListItem[];
}

export interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

export interface PokemonAbility {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

export interface PokemonSprite {
  front_default: string;
  other?: {
    'official-artwork'?: {
      front_default: string;
    };
  };
}

export interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: PokemonType[];
  stats: PokemonStat[];
  abilities: PokemonAbility[];
  sprites: PokemonSprite;
}

export interface PokemonSpecies {
  name: string;
  url: string;
}

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
