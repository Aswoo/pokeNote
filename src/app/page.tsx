"use client";

import React, { useState } from "react";
import PokemonCard from "../entities/pokemon/ui/PokemonCard";
import Header from "../widgets/header/Header";
import GenerationFilter from "../features/filter-by-generation/GenerationFilter";
import PaginationControls from "../features/pagination/PaginationControls";
import { usePokemonList, useGenerations } from "../shared/hooks";

export const PokemonListPage: React.FC = () => {
  const [offset, setOffset] = useState<number>(0);
  const [selectedGeneration, setSelectedGeneration] = useState<string>("");
  const limit = 20;

  // 커스텀 훅 사용
  const { pokemonList, loading, error, hasMore } = usePokemonList(offset, limit);
  const { generations, loading: generationsLoading } = useGenerations();

  // 세대 선택 핸들러
  const handleGenerationSelect = (generationUrl: string) => {
    setSelectedGeneration(generationUrl);
    setOffset(0); // 세대 변경 시 첫 페이지로
  };

  const handleNextPage = () => {
    if (hasMore) {
      setOffset((prev) => prev + limit);
    }
  };

  const handlePrevPage = () => {
    if (offset > 0) {
      setOffset((prev) => prev - limit);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen text-xl">
        Loading Pokémon...
      </div>
    );
  if (error)
    return (
      <div className="text-red-500 text-center text-xl mt-10">
        Error: {error}
      </div>
    );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-8">Pokédex</h1>

      <GenerationFilter
        generations={generationsLoading ? [] : generations}
        selectedGeneration={selectedGeneration}
        onSelectGeneration={handleGenerationSelect}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {pokemonList.map((pokemon) => (
          <PokemonCard key={pokemon.name} pokemon={pokemon} />
        ))}
      </div>

      <PaginationControls
        onPrevPage={handlePrevPage}
        onNextPage={handleNextPage}
        disablePrev={offset === 0 || loading}
        disableNext={!hasMore || loading}
      />
    </div>
  );
};

export default function Home() {
  return (
    <>
      <Header />
      <main className="container mx-auto py-8">
        <PokemonListPage />
      </main>
    </>
  );
}
