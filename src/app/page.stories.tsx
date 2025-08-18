// src/app/page.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import Header from "../widgets/header/Header";
import PokemonListPage, { PokemonApi } from "./page";

// ---- Mock Data ----
const mockGenerations = [
  { name: "generation-i", url: "https://pokeapi.co/api/v2/generation/1/" },
  { name: "generation-ii", url: "https://pokeapi.co/api/v2/generation/2/" },
];

const mockPokemonList = [
  { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" },
  { name: "charmander", url: "https://pokeapi.co/api/v2/pokemon/4/" },
  { name: "squirtle", url: "https://pokeapi.co/api/v2/pokemon/7/" },
];

// ---- Mock Pokemon Objects ----
const mockBulbasaur = {
  /* ... */
};
const mockCharmander = {
  /* ... */
};
const mockSquirtle = {
  /* ... */
};

// ---- Mock API ----
const mockApi: PokemonApi = {
  getGenerations: async () => ({ results: mockGenerations }),
  getPokemonList: async () => ({
    count: mockPokemonList.length,
    results: mockPokemonList,
  }),
  getPokemonByUrl: async (url: string) => {
    if (url.includes("bulbasaur") || url.includes("/1/")) return mockBulbasaur;
    if (url.includes("charmander") || url.includes("/4/"))
      return mockCharmander;
    if (url.includes("squirtle") || url.includes("/7/")) return mockSquirtle;
    return mockBulbasaur;
  },
};

// ---- Storybook Meta ----
const meta: Meta<typeof PokemonListPage> = {
  title: "Pages/Home",
  component: PokemonListPage,
  parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ---- Default Story ----
export const Default: Story = {
  render: () => (
    <>
      <main className="container mx-auto py-8">
        <PokemonListPage api={mockApi} />
      </main>
    </>
  ),
};
