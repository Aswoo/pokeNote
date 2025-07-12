'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { getPokemonByUrl, Pokemon, EvolutionChain, EvolutionChainLink } from '@/lib/pokeapi';

interface EvolutionChainProps {
  evolutionChain: EvolutionChain;
  currentPokemonName: string;
}

const EvolutionStage = ({ stage, isCurrent }: { stage: EvolutionChainLink, isCurrent: boolean }) => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      const pokemonData = await getPokemonByUrl<Pokemon>(stage.species.url.replace('-species', ''));
      setPokemon(pokemonData);
    };
    fetchPokemon();
  }, [stage.species.url]);

  if (!pokemon) return <div>Loading...</div>;

  const primaryType = pokemon.types[0]?.type.name;
  const borderColor = isCurrent ? `var(--type-${primaryType})` : 'transparent';

  return (
    <div className="text-center">
      <Link href={`/pokemon/${pokemon.name}`}>
        <div style={{ border: `4px solid ${borderColor}`, borderRadius: '50%', padding: '4px' }}>
          <Image 
            src={pokemon.sprites.front_default} 
            alt={pokemon.name} 
            width={96} 
            height={96} 
            className="mx-auto" 
          />
        </div>
        <p className="capitalize mt-2">{pokemon.name}</p>
      </Link>
    </div>
  );
};

const EvolutionChainDisplay = ({ evolutionChain, currentPokemonName }: EvolutionChainProps) => {
  const evolutionStages: EvolutionChainLink[] = [];
  let currentStage = evolutionChain.chain;

  while (currentStage) {
    evolutionStages.push(currentStage);
    currentStage = currentStage.evolves_to[0];
  }

  return (
    <div className="flex justify-center items-center space-x-4 mt-8">
      {evolutionStages.map((stage, index) => (
        <div key={stage.species.name} className="flex items-center">
          <EvolutionStage stage={stage} isCurrent={stage.species.name === currentPokemonName} />
          {index < evolutionStages.length - 1 && <span className="text-2xl mx-4">→</span>}
        </div>
      ))}
    </div>
  );
};

export default EvolutionChainDisplay;
