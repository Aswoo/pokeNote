'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import PokemonCard from '@/entities/pokemon/ui/PokemonCard';
import Header from '@/widgets/header/Header';
import { useFavoritePokemon } from '@/shared/hooks';
import { getPokemonDetails } from '@/shared/api/pokeapi';
import type { Pokemon } from '@/shared/types/pokemon';

const FavoritesPage: React.FC = () => {
  const { favorites, removeFavorite } = useFavoritePokemon();
  const [favoritePokemon, setFavoritePokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 즐겨찾기한 Pokemon들의 상세 정보 가져오기
  useEffect(() => {
    const fetchFavoritePokemon = async () => {
      if (favorites.length === 0) {
        setFavoritePokemon([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        const pokemonDetails = await Promise.all(
          favorites.map(id => getPokemonDetails(id))
        );
        
        setFavoritePokemon(pokemonDetails);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch favorite Pokemon');
      } finally {
        setLoading(false);
      }
    };

    fetchFavoritePokemon();
  }, [favorites]);

  const handleRemoveFavorite = (pokemonId: number) => {
    removeFavorite(pokemonId);
  };

  if (loading) {
    return (
      <>
        <Header />
        <main className="container mx-auto py-8">
          <div className="flex justify-center items-center min-h-screen text-xl">
            즐겨찾기 Pokemon을 불러오는 중...
          </div>
        </main>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <main className="container mx-auto py-8">
          <div className="text-red-500 text-center text-xl mt-10">
            오류: {error}
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="container mx-auto py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">즐겨찾기 Pokemon</h1>
          <p className="text-lg text-gray-600">
            총 {favoritePokemon.length}마리의 Pokemon이 즐겨찾기에 추가되어 있습니다
          </p>
        </div>

        {favoritePokemon.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">💔</div>
            <h2 className="text-2xl font-semibold mb-2">즐겨찾기가 비어있습니다</h2>
            <p className="text-gray-600 mb-6">
              Pokemon 카드의 하트 버튼을 클릭하여 즐겨찾기에 추가해보세요!
            </p>
            <Link
              href="/"
              className="inline-block px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Pokemon 목록 보기
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {favoritePokemon.map((pokemon) => (
              <div key={pokemon.id} className="relative group">
                <PokemonCard pokemon={pokemon} />
                {/* 제거 버튼 */}
                <button
                  onClick={() => handleRemoveFavorite(pokemon.id)}
                  className="absolute top-2 left-2 z-10 p-1 rounded-full bg-red-500/80 hover:bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  aria-label="즐겨찾기에서 제거"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </>
  );
};

export default FavoritesPage;
