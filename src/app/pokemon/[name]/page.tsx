import React from "react";
import {
  getPokemonDetailsWithDamageRelations,
  getPokemonSpecies,
  getEvolutionChain,
  PokemonWithDamageRelations,
  EvolutionChain,
} from "../../../lib/pokeapi";
import { notFound } from "next/navigation";
import { isAxiosError } from "axios";
import PokemonDetailPageContent from "@/widgets/pokemon-detail/PokemonDetailPageContent";

interface PokemonDetailPageProps {
  params: { name: string };
}

// This is the main Server Component that fetches data.
const PokemonDetailPage = async ({ params }: PokemonDetailPageProps) => {
  const { name } = params;
  let pokemon: PokemonWithDamageRelations;
  let evolutionChain: EvolutionChain | null = null;

  try {
    pokemon = await getPokemonDetailsWithDamageRelations(name);
    const species = await getPokemonSpecies(pokemon.id);
    if (species.evolution_chain.url) {
      evolutionChain = await getEvolutionChain(species.evolution_chain.url);
    }
  } catch (err) {
    if (isAxiosError(err) && err.response?.status === 404) {
      notFound();
    }
    // For other errors, Next.js will automatically render the closest error.tsx
    throw err;
  }

  return (
    <PokemonDetailPageContent
      pokemon={pokemon}
      evolutionChain={evolutionChain}
    />
  );
};

export default PokemonDetailPage;
