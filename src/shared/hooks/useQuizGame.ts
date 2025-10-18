'use client';

import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import type { QuizPokemon } from '../types/pokemon';
import { useQuizScore } from './useLocalStorage';

const TIME_LIMIT = 30; // 30 seconds time limit

export const useQuizGame = () => {
  const [pokemon, setPokemon] = useState<QuizPokemon | null>(null);
  const [guess, setGuess] = useState('');
  const [isRevealed, setIsRevealed] = useState(false);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);

  const { highScore, updateScore, resetStats } = useQuizScore();

  // 랜덤 Pokemon 가져오기
  const fetchRandomPokemon = useCallback(async () => {
    try {
      setIsLoading(true);
      setMessage('');
      
      // 1-1010 사이의 랜덤 ID 생성 (현재 Pokemon 수)
      const randomId = Math.floor(Math.random() * 1010) + 1;
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
      
      const pokemonData: QuizPokemon = {
        name: response.data.name,
        sprite: response.data.sprites.front_default,
        types: response.data.types.map((type: { type: { name: string } }) => type.type.name)
      };
      
      setPokemon(pokemonData);
      setIsRevealed(false);
      setGuess('');
    } catch (error) {
      console.error('Error fetching Pokemon:', error);
      setMessage('포켓몬을 가져오는 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 게임 시작
  const startGame = useCallback(() => {
    setGameStarted(true);
    setGameEnded(false);
    setScore(0);
    setStreak(0);
    setTimeLeft(TIME_LIMIT);
    fetchRandomPokemon();
  }, [fetchRandomPokemon]);

  // 게임 종료
  const endGame = useCallback(() => {
    setGameEnded(true);
    setGameStarted(false);
    updateScore(score, streak);
  }, [score, streak, updateScore]);

  // 정답 확인
  const handleGuess = useCallback(() => {
    if (!pokemon || isRevealed || !guess.trim()) return;

    const isCorrect = guess.toLowerCase().trim() === pokemon.name.toLowerCase();
    
    if (isCorrect) {
      setMessage(`정답입니다! ${pokemon.name}이(가) 맞습니다!`);
      setScore(prev => prev + 1);
      setStreak(prev => prev + 1);
      setIsRevealed(true);
      
      // 2초 후 다음 문제
      setTimeout(() => {
        fetchRandomPokemon();
      }, 2000);
    } else {
      setMessage(`틀렸습니다. 정답은 ${pokemon.name}입니다.`);
      setStreak(0);
      setIsRevealed(true);
      
      // 3초 후 다음 문제
      setTimeout(() => {
        fetchRandomPokemon();
      }, 3000);
    }
  }, [pokemon, isRevealed, guess, fetchRandomPokemon]);

  // Enter 키 처리
  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isRevealed) {
      handleGuess();
    }
  }, [handleGuess, isRevealed]);

  // 타이머 효과
  useEffect(() => {
    if (!gameStarted || gameEnded) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          endGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameStarted, gameEnded, endGame]);

  // 초기 Pokemon 로드
  useEffect(() => {
    fetchRandomPokemon();
  }, [fetchRandomPokemon]);

  // 게임 리셋
  const resetGame = useCallback(() => {
    setGameStarted(false);
    setGameEnded(false);
    setScore(0);
    setStreak(0);
    setTimeLeft(TIME_LIMIT);
    setPokemon(null);
    setGuess('');
    setIsRevealed(false);
    setMessage('');
    fetchRandomPokemon();
  }, [fetchRandomPokemon]);

  // 통계 리셋
  const resetAllStats = useCallback(() => {
    resetStats();
    resetGame();
  }, [resetStats, resetGame]);

  return {
    // 게임 상태
    pokemon,
    guess,
    setGuess,
    isRevealed,
    message,
    isLoading,
    score,
    streak,
    timeLeft,
    gameStarted,
    gameEnded,
    highScore,
    
    // 게임 액션
    startGame,
    endGame,
    handleGuess,
    handleKeyPress,
    resetGame,
    resetAllStats,
    
    // 유틸리티
    isCorrect: pokemon && guess.toLowerCase().trim() === pokemon.name.toLowerCase(),
    canGuess: !isRevealed && guess.trim().length > 0,
    timePercentage: (timeLeft / TIME_LIMIT) * 100
  };
};
