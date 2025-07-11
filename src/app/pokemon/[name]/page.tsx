import React from 'react';
import { getPokemonDetails, Pokemon } from '../../../lib/pokeapi';
import Link from 'next/link';

interface PokemonDetailPageProps {
  params: { name: string };
}

const PokemonDetailPage: React.FC<PokemonDetailPageProps> = async ({ params }) => {
  const { name } = params;
  let pokemon: Pokemon | null = null;
  let error: string | null = null;

  try {
    pokemon = await getPokemonDetails(name);
  } catch (err) {
    error = `Failed to fetch details for ${name}.`;
    console.error(err);
  }

  const formatName = (str: string) => {
    return str.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  if (error) {
    return <div className="text-red-500 text-center text-xl mt-10">Error: {error}</div>;
  }

  if (!pokemon) {
    return <div className="text-yellow-500 text-center text-xl mt-10">Pokémon not found.</div>;
  }

  const officialArtwork = pokemon.sprites.other?.['official-artwork']?.front_default;

  return (
    <div className="container mx-auto p-4">
      <Link href="/" className="text-blue-500 hover:underline mb-4 inline-block">&larr; Back to List</Link>
      <div className="bg-white rounded-lg shadow-md p-6 flex flex-col md:flex-row items-center md:items-start">
        <div className="md:w-1/3 text-center mb-4 md:mb-0">
          <img 
            src={officialArtwork || pokemon.sprites.front_default || 'https://via.placeholder.com/250'} 
            alt={pokemon.name} 
            className="mx-auto w-48 h-48 object-contain"
          />
        </div>
        <div className="md:w-2/3 md:pl-8">
          <h1 className="text-4xl font-bold capitalize mb-2">{pokemon.name} <span className="text-gray-500 text-2xl">#{pokemon.id}</span></h1>
          
          <div className="mb-4">
            <h2 className="text-2xl font-semibold mb-2">Types</h2>
            <div className="flex space-x-2">
              {pokemon.types.map(({ type }) => (
                <span key={type.name} className="px-3 py-1 rounded-full text-sm font-medium capitalize" style={{ backgroundColor: `var(--type-${type.name})`, color: 'white' }}>
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
                <span className="w-24 text-lg capitalize font-medium">{formatName(stat.name)}:</span>
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
                  {is_hidden && <span className="ml-2 text-gray-500 text-sm">(hidden)</span>}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetailPage;
