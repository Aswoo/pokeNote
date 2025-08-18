import React from 'react';
import Image from 'next/image';
import { PokemonWithDamageRelations } from '@/shared/api/pokeapi';

interface PokemonCardFaceProps {
  pokemon: PokemonWithDamageRelations;
}

const PokemonCardFace: React.FC<PokemonCardFaceProps> = ({ pokemon }) => {
  const officialArtwork = pokemon.sprites.other?.['official-artwork']?.front_default;

  const getTypeColor = (typeName: string) => `var(--type-${typeName})`;

  return (
    <div 
      id="pokemon-card-face"
      className="w-[300px] h-[420px] bg-gradient-to-br from-yellow-300 to-yellow-500 p-3 rounded-xl shadow-lg border-4 border-yellow-600 font-sans text-black"
      style={{ fontFamily: `var(--font-press-start-2p)` }}
    >
      {/* Card Header */}
      <div className="flex justify-between items-center bg-gray-800 text-white p-1 rounded-t-md -m-3 mb-2 border-b-4 border-yellow-600">
        <h2 className="text-lg font-bold capitalize ml-2">{pokemon.name}</h2>
        <div className="flex items-center">
          <span className="text-sm mr-1">HP</span>
          <span className="text-lg font-bold mr-2">
            {pokemon.stats.find(s => s.stat.name === 'hp')?.base_stat}
          </span>
        </div>
      </div>

      {/* Image Section */}
      <div className="w-full h-48 bg-gradient-to-b from-blue-200 to-blue-400 rounded-md border-4 border-gray-700 shadow-inner overflow-hidden">
        {officialArtwork && (
          <Image
            src={officialArtwork}
            alt={pokemon.name}
            width={200}
            height={200}
            className="w-full h-full object-contain"
          />
        )}
      </div>

      {/* Type Section */}
      <div className="flex justify-center my-2 space-x-2">
        {pokemon.types.map(({ type }) => (
          <div 
            key={type.name} 
            className="px-3 py-1 text-xs font-bold text-white rounded-full border-2 border-gray-800 shadow-md capitalize"
            style={{ backgroundColor: getTypeColor(type.name) }}
          >
            {type.name}
          </div>
        ))}
      </div>

      {/* Stats Section */}
      <div className="bg-gray-200 p-2 rounded-md border-2 border-gray-400 text-xs">
        <div className="grid grid-cols-2 gap-x-2 gap-y-1">
          {pokemon.stats.slice(1, 5).map(stat => (
            <div key={stat.stat.name} className="flex justify-between">
              <span className="font-semibold capitalize">{stat.stat.name.replace('-', ' ')}:</span>
              <span className="font-bold">{stat.base_stat}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-gray-800 text-[8px] mt-2">
        <p>PokéView Card / No. {pokemon.id}</p>
        <p>©2024 Gemini-CLI Project</p>
      </div>
    </div>
  );
};

export default PokemonCardFace;
