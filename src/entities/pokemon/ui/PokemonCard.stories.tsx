
import type { Meta, StoryObj } from '@storybook/react';
import PokemonCard from './PokemonCard';
import type { Pokemon } from '@/shared/types/pokemon';

const meta: Meta<typeof PokemonCard> = {
  title: 'Entities/Pokemon/PokemonCard',
  component: PokemonCard,
  tags: ['autodocs'], // Enable automatic documentation
  argTypes: {
    pokemon: { control: 'object' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Mock Pokemon data for the story
const mockPokemon: Pokemon = {
  id: 25,
  name: 'pikachu',
  height: 4,
  weight: 60,
  types: [{ slot: 1, type: { name: 'electric', url: '' } }],
  stats: [],
  abilities: [],
  sprites: { front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png' },
  species: { url: '' },
};

export const Default: Story = {
  args: {
    pokemon: mockPokemon,
  },
};

export const FireType: Story = {
  args: {
    pokemon: {
      ...mockPokemon,
      id: 4,
      name: 'charmander',
      types: [{ slot: 1, type: { name: 'fire', url: '' } }],
      sprites: { front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png' },
    },
  },
};

export const GrassType: Story = {
  args: {
    pokemon: {
      ...mockPokemon,
      id: 1,
      name: 'bulbasaur',
      types: [{ slot: 1, type: { name: 'grass', url: '' } }, { slot: 2, type: { name: 'poison', url: '' } }],
      sprites: { front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png' },
    },
  },
};
