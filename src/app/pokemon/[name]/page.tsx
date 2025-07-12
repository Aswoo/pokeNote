import React from "react";
import {
  getPokemonDetails,
  getPokemonSpecies,
  getEvolutionChain,
  Pokemon,
  EvolutionChain,
} from "../../../lib/pokeapi";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { isAxiosError } from "axios";
import EvolutionChainDisplay from "../../components/EvolutionChain";

const PokemonDetailPage = async (props: {
  params: Promise<{ name: string }>;
}) => {
  const params = await props.params;
  const { name } = params;
  let pokemon: Pokemon;
  let evolutionChain: EvolutionChain | null = null;

  try {
    pokemon = await getPokemonDetails(name);
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

  const formatName = (str: string) => {
    return str
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const officialArtwork =
    pokemon.sprites.other?.["official-artwork"]?.front_default;

  return (
    <div className="container mx-auto p-4">
      <Link
        href="/"
        className="text-blue-500 hover:underline mb-4 inline-block"
      >
        &larr; Back to List
      </Link>
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col md:flex-row items-center md:items-start">
          <div className="md:w-1/3 text-center mb-4 md:mb-0">
            <Image
              src={
                officialArtwork ||
                pokemon.sprites.front_default ||
                "https://via.placeholder.com/250"
              }
              alt={pokemon.name}
              width={192}
              height={192}
              className="mx-auto object-contain"
              priority
            />
          </div>
          <div className="md:w-2/3 md:pl-8">
            <h1 className="text-4xl font-bold capitalize mb-2">
              {pokemon.name}{" "}
              <span className="text-gray-500 text-2xl">#{pokemon.id}</span>
            </h1>

            <div className="mb-4">
              <h2 className="text-2xl font-semibold mb-2">Types</h2>
              <div className="flex space-x-2">
                {pokemon.types.map(({ type }) => (
                  <span
                    key={type.name}
                    className="px-3 py-1 rounded-full text-sm font-medium capitalize"
                    style={{
                      backgroundColor: `var(--type-${type.name})`,
                      color: "white",
                    }}
                  >
                    {type.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <h2 className="text-2xl font-semibold mb-2">Height</h2>
                <p className="text-lg">{pokemon.height / 10} m</p>
              </div>
              <div>
                <h2 className="text-2xl font-semibold mb-2">Weight</h2>
                <p className="text-lg">{pokemon.weight / 10} kg</p>
              </div>
            </div>

            <div className="mb-4">
              <h2 className="text-2xl font-semibold mb-2">Base Stats</h2>
              {pokemon.stats.map(({ stat, base_stat }) => (
                <div key={stat.name} className="flex items-center mb-1">
                  <span className="w-24 text-lg capitalize font-medium">
                    {formatName(stat.name)}:
                  </span>
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div
                      className="bg-blue-500 h-4 rounded-full"
                      style={{ width: `${(base_stat / 255) * 100}%` }}
                    ></div>
                  </div>
                  <span className="ml-2 text-lg">{base_stat}</span>
                </div>
              ))}
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-2">Abilities</h2>
              <ul className="list-disc list-inside">
                {pokemon.abilities.map(({ ability, is_hidden }) => (
                  <li key={ability.name} className="text-lg capitalize">
                    {formatName(ability.name)}
                    {is_hidden && (
                      <span className="ml-2 text-gray-500 text-sm">
                        (hidden)
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        {evolutionChain && (
          <div className="mt-8 pt-6 border-t">
            <h2 className="text-3xl font-bold text-center mb-4">Evolution Chain</h2>
            <EvolutionChainDisplay evolutionChain={evolutionChain} currentPokemonName={pokemon.name} />
          </div>
        )}
      </div>
    </div>
  );
};

export default PokemonDetailPage;
