'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Pokemon } from '@/shared/api/pokeapi'; // Adjust path as needed

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
  const primaryType = pokemon.types && pokemon.types.length > 0 ? pokemon.types[0].type.name : 'normal';
  const typeColor = typeColors[primaryType] || '#A8A77A'; // Default to normal type color

  const borderColor = isHovered ? typeColor : 'transparent';
  const boxShadow = isHovered ? `0 0 15px ${typeColor}` : 'none';

  return (
    <Link href={`/pokemon/${pokemon.name}`} key={pokemon.name} className="block">
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