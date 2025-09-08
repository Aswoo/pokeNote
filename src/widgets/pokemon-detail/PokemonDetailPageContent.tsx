'use client';

import React from 'react';
import Link from 'next/link';
import {
  PokemonWithDamageRelations,
  EvolutionChain,
} from '@/shared/api/pokeapi';
import EvolutionChainDisplay from '@/entities/pokemon/ui/EvolutionChain';
import DamageRelationsDisplay from '@/entities/pokemon/ui/DamageRelationsDisplay';
import StatRadarChart from '@/entities/pokemon/ui/StatRadarChart';
import { Pokemon3DViewer } from '@/entities/pokemon/ui/Pokemon3DViewer';

interface ContentProps {
  pokemon: PokemonWithDamageRelations;
  evolutionChain: EvolutionChain | null;
}

const PokemonDetailPageContent: React.FC<ContentProps> = ({ pokemon, evolutionChain }) => {
  'use client';

  const formatName = (str: string) => {
    return str
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <div className="container mx-auto p-4">
      <Link href="/" className="text-blue-500 hover:underline mb-4 inline-block">
        &larr; Back to List
      </Link>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col md:flex-row items-center md:items-start">
          {/* 3D Viewer replaces the old Image component and button */}
          <div className="md:w-1/3 text-center mb-4 md:mb-0" style={{ height: '250px' }}>
            <Pokemon3DViewer pokemonId={pokemon.id} className="w-full h-full" />
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
    </div>
  );
};

export default PokemonDetailPageContent;
