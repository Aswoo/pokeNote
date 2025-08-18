'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  PokemonWithDamageRelations,
  EvolutionChain,
} from '@/shared/api/pokeapi';
import EvolutionChainDisplay from '@/entities/pokemon/ui/EvolutionChain';
import DamageRelationsDisplay from '@/entities/pokemon/ui/DamageRelationsDisplay';
import StatRadarChart from '@/entities/pokemon/ui/StatRadarChart';
import Pokemon3DCard from '@/entities/pokemon/ui/Pokemon3DCard';
import PokemonCardFace from '@/entities/pokemon/ui/PokemonCardFace'; // PokemonCardFace는 이제 3DCard 내부에서 사용

interface ContentProps {
  pokemon: PokemonWithDamageRelations;
  evolutionChain: EvolutionChain | null;
}

const PokemonDetailPageContent: React.FC<ContentProps> = ({ pokemon, evolutionChain }) => {
  'use client';
  const [show3DCard, setShow3DCard] = useState(false);

  const formatName = (str: string) => {
    return str
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const officialArtwork =
    pokemon.sprites.other?.['official-artwork']?.front_default;

  console.log("Pokemon Image URL passed to 3D Card:", officialArtwork || pokemon.sprites.front_default || 'https://via.placeholder.com/250');

  return (
    <div className="container mx-auto p-4">
      <Link href="/" className="text-blue-500 hover:underline mb-4 inline-block">
        &larr; Back to List
      </Link>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-end mb-4">
            <button 
                onClick={() => setShow3DCard(true)}
                className="px-4 py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors"
            >
                View as 3D Card
            </button>
        </div>

        <div className="flex flex-col md:flex-row items-center md:items-start">
          <div className="md:w-1/3 text-center mb-4 md:mb-0">
            <Image
              src={officialArtwork || pokemon.sprites.front_default || 'https://via.placeholder.com/250'}
              alt={pokemon.name}
              width={192}
              height={192}
              className="mx-auto object-contain"
              priority
            />
          </div>
          <div className="md:w-2/3 md:pl-8">
            <h1 className="text-4xl font-bold capitalize mb-2">
              {pokemon.name}{' '}
              <span className="text-gray-500 text-2xl">#{pokemon.id}</span>
            </h1>
            <div className="mb-4">
              <h2 className="text-2xl font-semibold mb-2">Types</h2>
              <div className="flex space-x-2">
                {pokemon.types.map(({ type }) => (
                  <span
                    key={type.name}
                    className="px-3 py-1 rounded-full text-sm font-medium capitalize text-white"
                    style={{ backgroundColor: `var(--type-${type.name})` }}
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
              <div className="relative h-80 w-full">
                <StatRadarChart stats={pokemon.stats} />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-2">Abilities</h2>
              <ul className="list-disc list-inside">
                {pokemon.abilities.map(({ ability, is_hidden }) => (
                  <li key={ability.name} className="text-lg capitalize">
                    {formatName(ability.name)}
                    {is_hidden && <span className="ml-2 text-gray-500 text-sm">(hidden)</span>}
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

        <div className="mt-8 pt-6 border-t">
          <h2 className="text-3xl font-bold text-center mb-4">Type Matchup</h2>
          <DamageRelationsDisplay damageRelations={pokemon.damageRelations} />
        </div>
      </div>

      {show3DCard && (
        <Pokemon3DCard onClose={() => setShow3DCard(false)} pokemonImageUrl={officialArtwork || pokemon.sprites.front_default || 'https://via.placeholder.com/250'} />
      )}
    </div>
  );
};

export default PokemonDetailPageContent;