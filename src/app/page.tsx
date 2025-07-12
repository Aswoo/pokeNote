"use client"; // This is important for client-side hooks like useState, useEffect, Link

import React, { useState, useEffect } from "react";
import {
  getPokemonList,
  getPokemonByUrl,
  Pokemon,
  getGenerations,
  GenerationListItem,
} from "../lib/pokeapi"; // Adjust path as needed
import PokemonCard from "./components/PokemonCard"; // Import the new component
import Header from "./components/Header"; // Import the Header component
import GenerationFilter from "./components/GenerationFilter"; // Import the GenerationFilter component
import PaginationControls from "./components/PaginationControls"; // Import the PaginationControls component

const PokemonListPage: React.FC = () => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [offset, setOffset] = useState<number>(0);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [generations, setGenerations] = useState<GenerationListItem[]>([]); // New state for generations
  const [selectedGeneration, setSelectedGeneration] = useState<string>(""); // New state for selected generation
  const limit = 20;

  useEffect(() => {
    const fetchGenerations = async () => {
      try {
        const response = await getGenerations();
        setGenerations(response.results);
      } catch (err) {
        console.error("Failed to fetch generations:", err);
      }
    };
    fetchGenerations();
  }, []); // Fetch generations only once on mount

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        setLoading(true);
        let listResponse;
        if (selectedGeneration) {
          // Extract generation ID from URL (e.g., "https://pokeapi.co/api/v2/generation/1/")
          const match = selectedGeneration.match(/\/generation\/(\d+)\//);
          const generationId = match ? parseInt(match[1]) : NaN;
          if (!isNaN(generationId)) {
            // Ensure generationId is a valid number
            listResponse = await getPokemonList(offset, limit, generationId);
          } else {
            // Fallback to all pokemon if generationId is invalid
            listResponse = await getPokemonList(offset, limit);
          }
        } else {
          listResponse = await getPokemonList(offset, limit);
        }
        setTotalCount(listResponse.count);

        const detailedPokemonPromises = listResponse.results.map(async (p) => {
          const details = await getPokemonByUrl<Pokemon>(p.url);
          return details;
        });
        const detailedPokemon = await Promise.all(detailedPokemonPromises);

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
  }, [offset, selectedGeneration]); // Added selectedGeneration to dependencies

  const handleNextPage = () => {
    if (offset + limit < totalCount) {
      setOffset((prevOffset) => prevOffset + limit);
    }
  };

  const handlePrevPage = () => {
    if (offset > 0) {
      setOffset((prevOffset) => prevOffset - limit);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-xl">
        Loading Pokémon...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center text-xl mt-10">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-8">Pokédex</h1>

      <GenerationFilter
        generations={generations}
        selectedGeneration={selectedGeneration}
        onSelectGeneration={(value) => {
          setSelectedGeneration(value);
          setOffset(0); // Reset offset when generation changes
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
