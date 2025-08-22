'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Pokemon {
  name: string;
  sprite: string;
  types: string[];
}

const TIME_LIMIT = 30; // 30 seconds time limit

const QuizGame = () => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [guess, setGuess] = useState('');
  const [isRevealed, setIsRevealed] = useState(false);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [highScore, setHighScore] = useState(0);

  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);

  // New state for hint system
  const [isHintUsed, setIsHintUsed] = useState(false);

  useEffect(() => {
    const savedHighScore = localStorage.getItem('pokemonQuizHighScore');
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore, 10));
    }
  }, []);

  const fetchRandomPokemon = async () => {
    setIsLoading(true);
    setPokemon(null);
    setGuess('');
    setIsRevealed(false);
    setMessage('');
    setTimeLeft(TIME_LIMIT);
    setIsHintUsed(false); // Reset hint

    try {
      const randomId = Math.floor(Math.random() * 1025) + 1;
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
      const name = response.data.name;
      const sprite = response.data.sprites.front_default;
      const types = response.data.types.map((typeInfo: any) => typeInfo.type.name);
      setPokemon({ name, sprite, types });
    } catch (error) {
      console.error("Error fetching Pokémon:", error);
      setMessage("Failed to load a Pokémon. Please try again.");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchRandomPokemon();
  }, []);

  useEffect(() => {
    if (!isLoading && !isRevealed && timeLeft > 0) {
      const timerId = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timerId);
    } else if (timeLeft === 0) {
      handleGuess(true);
    }
  }, [isLoading, isRevealed, timeLeft]);

  const handleGuess = (timeout = false) => {
    if (!pokemon) return;

    if (timeout) {
      setStreak(0);
      setMessage(`Time's up! The answer was ${pokemon.name}.`);
    } else if (guess.toLowerCase() === pokemon.name.toLowerCase()) {
      const newScore = score + 1;
      const newStreak = streak + 1;
      setScore(newScore);
      setStreak(newStreak);
      setMessage(`Correct! It's ${pokemon.name}.`);

      if (newScore > highScore) {
        setHighScore(newScore);
        localStorage.setItem('pokemonQuizHighScore', newScore.toString());
      }
    } else {
      setStreak(0);
      setMessage(`Nope! The correct answer was ${pokemon.name}.`);
    }
    setIsRevealed(true);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleGuess();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4">
      <div className="absolute top-4 left-4 text-lg">
        <p>Time Left: {timeLeft}s</p>
      </div>
      <div className="absolute top-4 right-4 text-lg text-right">
        <p>Score: {score}</p>
        <p>Streak: {streak}</p>
        <p>High Score: {highScore}</p>
      </div>

      <h1 className="text-4xl font-bold mb-8 text-center">Who's That Pokémon?</h1>
      
      <div className="w-64 h-64 flex items-center justify-center rounded-lg mb-8">
        {isLoading && <p>Loading...</p>}
        {pokemon && (
          <img 
            src={pokemon.sprite}
            alt="Pokémon silhouette"
            className={`w-full h-full object-contain transition-all duration-500 ${isRevealed ? '' : 'brightness-0'}`}
          />
        )}
      </div>

      {!isRevealed ? (
        <div className="flex flex-col items-center">
          <input 
            type="text" 
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter Pokémon name" 
            className="px-4 py-2 border rounded-lg text-black"
          />
          <div className="flex space-x-4">
            <button 
              onClick={() => handleGuess()}
              className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
              disabled={!guess || isLoading}
            >
              Submit
            </button>
            <button 
              onClick={() => setIsHintUsed(true)}
              className="mt-4 px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 disabled:bg-gray-400"
              disabled={isHintUsed || isLoading}
            >
              Hint
            </button>
          </div>
          {isHintUsed && pokemon && (
            <p className="mt-4 text-lg">Hint: This Pokémon's type is {pokemon.types.join(' / ')}.</p>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <p className="mt-8 text-2xl font-bold text-center">{message}</p>
          <button 
            onClick={fetchRandomPokemon}
            className="mt-4 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizGame;
