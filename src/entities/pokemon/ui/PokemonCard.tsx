'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import type { Pokemon } from '@/shared/types/pokemon';
import { useFavoritePokemon } from '@/shared/hooks';

interface PokemonCardProps {
  pokemon: Pokemon;
}

const typeColors: { [key: string]: string } = {
  normal: '#A8A77A',
  fire: '#EE8130',
  water: '#6390F0',
  electric: '#F7D02C',
  grass: '#7AC74C',
  ice: '#96D9D6',
  fighting: '#C22E28',
  poison: '#A33EA1',
  ground: '#E2BF65',
  flying: '#A98FF3',
  psychic: '#F95587',
  bug: '#A6B91A',
  rock: '#B6A136',
  ghost: '#735797',
  dragon: '#6F35FC',
  steel: '#B7B7CE',
  fairy: '#D685AD',
};

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { isFavorite, toggleFavorite } = useFavoritePokemon();
  
  const primaryType = pokemon.types && pokemon.types.length > 0 ? pokemon.types[0].type.name : 'normal';
  const typeColor = typeColors[primaryType] || '#A8A77A'; // Default to normal type color

  const borderColor = isHovered ? typeColor : 'transparent';
  const boxShadow = isHovered ? `0 0 15px ${typeColor}` : 'none';
  
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('🖱️ Heart button clicked for Pokemon ID:', pokemon.id, 'Name:', pokemon.name);
    toggleFavorite(pokemon.id);
  };

  return (
    <Link href={`/pokemon/${pokemon.name}`} key={pokemon.name} className="block relative">
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="bg-white rounded-lg shadow-md p-4 text-center transform transition duration-300 hover:scale-105"
        style={{
          border: `2px solid ${borderColor}`,
          boxShadow: boxShadow,
          transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
        }}
      >
        {/* 즐겨찾기 버튼 */}
        <button
          onClick={handleFavoriteClick}
          className="absolute top-2 right-2 z-10 p-1 rounded-full bg-white/80 hover:bg-white transition-colors duration-200"
          aria-label={isFavorite(pokemon.id) ? '즐겨찾기 해제' : '즐겨찾기 추가'}
        >
          <svg
            className={`w-5 h-5 transition-colors duration-200 ${
              isFavorite(pokemon.id) ? 'text-red-500 fill-current' : 'text-gray-400 hover:text-red-500'
            }`}
            fill={isFavorite(pokemon.id) ? 'currentColor' : 'none'}
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>

        <img
          src={pokemon.sprites?.front_default || 'https://via.placeholder.com/150'}
          alt={pokemon.name}
          className="mx-auto mb-4 w-24 h-24 object-contain"
        />
        <h2 className="text-xl font-semibold capitalize">{pokemon.name}</h2>
      </div>
    </Link>
  );
};

export default PokemonCard;