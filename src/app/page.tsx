"use client";

import React, { useState, useEffect } from "react";
import { Pokemon, GenerationListItem } from "../lib/pokeapi"; // 타입만 import
import PokemonCard from "../entities/pokemon/ui/PokemonCard";
import Header from "../widgets/header/Header";
import GenerationFilter from "../features/filter-by-generation/GenerationFilter";
import PaginationControls from "../features/pagination/PaginationControls";

// API 인터페이스 정의
export interface PokemonApi {
  getGenerations: () => Promise<{ results: GenerationListItem[] }>;
  getPokemonList: (
    offset: number,
    limit: number,
    generationId?: number
  ) => Promise<{ count: number; results: { name: string; url: string }[] }>;
  getPokemonByUrl: (url: string) => Promise<Pokemon>;
}

interface PokemonListPageProps {
  api: PokemonApi;
}

export const PokemonListPage: React.FC<PokemonListPageProps> = ({ api }) => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [offset, setOffset] = useState<number>(0);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [generations, setGenerations] = useState<GenerationListItem[]>([]);
  const [selectedGeneration, setSelectedGeneration] = useState<string>("");
  const limit = 20;

  // 세대 가져오기
  useEffect(() => {
    const fetchGenerations = async () => {
      try {
        const response = await api.getGenerations();
        setGenerations(response.results);
      } catch (err) {
        console.error("Failed to fetch generations:", err);
      }
    };
    fetchGenerations();
  }, [api]);

  // 포켓몬 목록 가져오기
  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        setLoading(true);

        let listResponse;
        if (selectedGeneration) {
          const match = selectedGeneration.match(/\/generation\/(\d+)\//);
          const generationId = match ? parseInt(match[1]) : NaN;
          if (!isNaN(generationId)) {
            listResponse = await api.getPokemonList(
              offset,
              limit,
              generationId
            );
          } else {
            listResponse = await api.getPokemonList(offset, limit);
          }
        } else {
          listResponse = await api.getPokemonList(offset, limit);
        }

        setTotalCount(listResponse.count);

        const detailedPokemon: Pokemon[] = await Promise.all(
          listResponse.results.map(
            async (p) => await api.getPokemonByUrl(p.url)
          )
        );
        setPokemonList(detailedPokemon);
        setError(null);
      } catch (err) {
        setError("Failed to fetch Pokémon list.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, [offset, selectedGeneration, api]);

  const handleNextPage = () => {
    if (offset + limit < totalCount) {
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
        generations={generations}
        selectedGeneration={selectedGeneration}
        onSelectGeneration={(value) => {
          setSelectedGeneration(value);
          setOffset(0);
        }}
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
        disableNext={offset + limit >= totalCount || loading}
      />
    </div>
  );
};

// Home 컴포넌트에서는 기본 API를 주입
import * as apiModule from "../lib/pokeapi"; // 실제 API

export default function Home() {
  return (
    <>
      <Header />
      <main className="container mx-auto py-8">
        <PokemonListPage api={apiModule} />
      </main>
    </>
  );
}
