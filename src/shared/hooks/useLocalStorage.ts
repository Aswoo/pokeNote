'use client';

import { useState, useEffect, useCallback } from 'react';

// localStorage 값을 관리하는 커스텀 훅
export const useLocalStorage = <T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void, () => void] => {
  // SSR 안전성을 위한 초기값 설정
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // localStorage에 값을 저장하는 함수
  const setValue = useCallback((value: T | ((val: T) => T)) => {
    try {
      console.log('💾 setValue called for key:', key);
      setStoredValue(prevValue => {
        console.log('📦 Previous value:', prevValue);
        const valueToStore = value instanceof Function ? value(prevValue) : value;
        console.log('📦 New value to store:', valueToStore);
        
        if (typeof window !== 'undefined') {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
          console.log('💾 Saved to localStorage');
        }
        
        return valueToStore;
      });
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  }, [key]);

  // localStorage에서 값을 제거하는 함수
  const removeValue = useCallback(() => {
    try {
      setStoredValue(initialValue);
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key);
      }
    } catch (error) {
      console.warn(`Error removing localStorage key "${key}":`, error);
    }
  }, [key, initialValue]);

  // localStorage 변경사항 감지
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue !== null) {
        try {
          setStoredValue(JSON.parse(e.newValue));
        } catch (error) {
          console.warn(`Error parsing localStorage key "${key}":`, error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key]);

  return [storedValue, setValue, removeValue];
};

// 즐겨찾기 Pokemon을 관리하는 훅
export const useFavoritePokemon = () => {
  const [favorites, setFavorites] = useState<number[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const stored = localStorage.getItem('pokemon-favorites');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // favorites가 변경될 때마다 localStorage에 저장
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('pokemon-favorites', JSON.stringify(favorites));
    }
  }, [favorites]);
  
  const toggleFavorite = useCallback((pokemonId: number) => {
    console.log('🔄 toggleFavorite called with ID:', pokemonId);
    setFavorites(prev => {
      console.log('📋 Current favorites before toggle:', prev);
      const isCurrentlyFavorite = prev.includes(pokemonId);
      console.log('❓ Is currently favorite?', isCurrentlyFavorite);
      
      let newFavorites;
      if (isCurrentlyFavorite) {
        newFavorites = prev.filter(id => id !== pokemonId);
        console.log('➖ Removing from favorites:', newFavorites);
      } else {
        newFavorites = [...prev, pokemonId];
        console.log('➕ Adding to favorites:', newFavorites);
      }
      
      // localStorage에 즉시 저장
      if (typeof window !== 'undefined') {
        localStorage.setItem('pokemon-favorites', JSON.stringify(newFavorites));
        console.log('💾 Saved to localStorage immediately:', newFavorites);
      }
      
      return newFavorites;
    });
  }, []);

  const isFavorite = useCallback((pokemonId: number) => {
    return favorites.includes(pokemonId);
  }, [favorites]);

  return {
    favorites,
    toggleFavorite,
    isFavorite
  };
};

// 최근 본 Pokemon을 관리하는 훅
export const useRecentPokemon = (maxItems: number = 10) => {
  const [recentPokemon, setRecentPokemon] = useLocalStorage<number[]>('pokemon-recent', []);
  
  const addRecent = useCallback((pokemonId: number) => {
    setRecentPokemon(prev => {
      const filtered = prev.filter(id => id !== pokemonId);
      const updated = [pokemonId, ...filtered].slice(0, maxItems);
      return updated;
    });
  }, [setRecentPokemon, maxItems]);

  const clearRecent = useCallback(() => {
    setRecentPokemon([]);
  }, [setRecentPokemon]);

  return {
    recentPokemon,
    addRecent,
    clearRecent
  };
};

// 퀴즈 게임 점수를 관리하는 훅
export const useQuizScore = () => {
  const [highScore, setHighScore] = useLocalStorage<number>('quiz-high-score', 0);
  const [totalGames, setTotalGames] = useLocalStorage<number>('quiz-total-games', 0);
  const [totalCorrect, setTotalCorrect] = useLocalStorage<number>('quiz-total-correct', 0);
  
  const updateScore = useCallback((score: number, correct: number) => {
    setHighScore(prev => Math.max(prev, score));
    setTotalGames(prev => prev + 1);
    setTotalCorrect(prev => prev + correct);
  }, [setHighScore, setTotalGames, setTotalCorrect]);

  const resetStats = useCallback(() => {
    setHighScore(0);
    setTotalGames(0);
    setTotalCorrect(0);
  }, [setHighScore, setTotalGames, setTotalCorrect]);

  const accuracy = totalGames > 0 ? (totalCorrect / totalGames) * 100 : 0;

  return {
    highScore,
    totalGames,
    totalCorrect,
    accuracy,
    updateScore,
    resetStats
  };
};

// 테마 관리를 위한 훅
export const useTheme = () => {
  const [theme, setTheme] = useLocalStorage<'light' | 'dark'>('pokemon-theme', 'light');
  
  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  }, [setTheme]);

  return {
    theme,
    setTheme,
    toggleTheme,
    isDark: theme === 'dark'
  };
};
