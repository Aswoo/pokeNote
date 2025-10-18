// 공통 Pokemon 타입 정의
export interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: PokemonType[];
  stats: PokemonStat[];
  abilities: PokemonAbility[];
  sprites: PokemonSprite;
  species: {
    url: string;
  };
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

// Quiz용 간소화된 Pokemon 타입
export interface QuizPokemon {
  name: string;
  sprite: string;
  types: string[];
}

// API 응답 타입들
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

export interface GenerationListItem {
  name: string;
  url: string;
}

export interface GenerationListResponse {
  count: number;
  results: GenerationListItem[];
}

export interface PokemonSpecies {
  name: string;
  url: string;
}

export interface PokemonSpeciesDetails {
  evolution_chain: {
    url: string;
  };
}

export interface EvolutionChainLink {
  species: {
    name: string;
    url: string;
  };
  evolves_to: EvolutionChainLink[];
}

export interface EvolutionChain {
  id: number;
  chain: EvolutionChainLink;
}

// Damage Relations 타입들
export interface DamageRelations {
  double_damage_from: { name: string; url: string }[];
  half_damage_from: { name: string; url: string }[];
  no_damage_from: { name: string; url: string }[];
}

export interface TypeDetails {
  name: string;
  damage_relations: DamageRelations;
}

export interface PokemonWithDamageRelations extends Pokemon {
  damageRelations: {
    weaknesses: { name: string; multiplier: number }[];
    resistances: { name: string; multiplier: number }[];
    immunities: string[];
  };
}
