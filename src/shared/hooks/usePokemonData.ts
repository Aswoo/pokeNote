'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Pokemon, GenerationListItem } from '../types/pokemon';
import { 
  getPokemonList, 
  getPokemonDetails, 
  getGenerations 
} from '../api/pokeapi';

// Pokemon 목록을 위한 훅
export const usePokemonList = (offset: number = 0, limit: number = 20) => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const fetchPokemonList = useCallback(async () => {
    console.log('🔄 fetchPokemonList called with offset:', offset, 'limit:', limit);
    try {
      setLoading(true);
      setError(null);
      
      console.log('📡 Fetching Pokemon list...');
      const response = await getPokemonList(offset, limit);
      console.log('📡 Pokemon list response:', response);
      
      console.log('📡 Fetching Pokemon details...');
      const pokemonDetails = await Promise.all(
        response.results.map(item => getPokemonDetails(item.name))
      );
      console.log('📡 Pokemon details fetched:', pokemonDetails);
      
      setPokemonList(pokemonDetails);
      setHasMore(!!response.next);
    } catch (err) {
      console.error('❌ Error fetching Pokemon list:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch Pokemon list');
    } finally {
      setLoading(false);
    }
  }, [offset, limit]);

  useEffect(() => {
    fetchPokemonList();
  }, [fetchPokemonList]);

  return { pokemonList, loading, error, hasMore, refetch: fetchPokemonList };
};

// 단일 Pokemon 상세 정보를 위한 훅
export const usePokemonDetails = (nameOrId: string | number) => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPokemonDetails = useCallback(async () => {
    if (!nameOrId) return;
    
    try {
      setLoading(true);
      setError(null);
      
      const data = await getPokemonDetails(nameOrId);
      setPokemon(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch Pokemon details');
    } finally {
      setLoading(false);
    }
  }, [nameOrId]);

  useEffect(() => {
    fetchPokemonDetails();
  }, [fetchPokemonDetails]);

  return { pokemon, loading, error, refetch: fetchPokemonDetails };
};

// Generation 목록을 위한 훅
export const useGenerations = () => {
  const [generations, setGenerations] = useState<GenerationListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchGenerations = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await getGenerations();
      setGenerations(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch generations');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGenerations();
  }, [fetchGenerations]);

  return { generations, loading, error, refetch: fetchGenerations };
};

// Pokemon 검색을 위한 훅
export const usePokemonSearch = (query: string) => {
  const [searchResults, setSearchResults] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchPokemon = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const data = await getPokemonDetails(searchQuery.toLowerCase());
      setSearchResults([data]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Pokemon not found');
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      searchPokemon(query);
    }, 300); // 300ms 디바운스

    return () => clearTimeout(timeoutId);
  }, [query, searchPokemon]);

  return { searchResults, loading, error };
};
