'use client';

import React, { useState } from 'react';
import { useQuizGame } from '@/shared/hooks';

const QuizGame = () => {
  const {
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
    handleGuess,
    handleKeyPress,
    resetGame,
    resetAllStats,
    
    // 유틸리티
    canGuess
  } = useQuizGame();

  // 힌트 시스템을 위한 로컬 상태
  const [isHintUsed, setIsHintUsed] = useState(false);

  // 힌트 사용 핸들러
  const handleHint = () => {
    if (pokemon && !isHintUsed) {
      const hint = pokemon.name.charAt(0).toUpperCase() + pokemon.name.charAt(1).toLowerCase();
      setGuess(hint);
      setIsHintUsed(true);
    }
  };

  // 게임이 끝났을 때 힌트 상태 리셋
  React.useEffect(() => {
    if (gameEnded) {
      setIsHintUsed(false);
    }
  }, [gameEnded]);

  // 게임이 시작되지 않았을 때
  if (!gameStarted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4">
        <h1 className="text-4xl font-bold mb-8 text-center">Who's That Pokémon?</h1>
        <div className="text-center mb-8">
          <p className="text-lg mb-4">30초 안에 포켓몬의 이름을 맞춰보세요!</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            최고 점수: {highScore}
          </p>
        </div>
        <button
          onClick={startGame}
          className="px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-lg font-semibold"
        >
          게임 시작
        </button>
      </div>
    );
  }

  // 게임이 끝났을 때
  if (gameEnded) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4">
        <h1 className="text-4xl font-bold mb-8 text-center">게임 종료!</h1>
        <div className="text-center mb-8">
          <p className="text-2xl mb-4">최종 점수: {score}</p>
          <p className="text-lg mb-2">최고 점수: {highScore}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {score === highScore ? '🎉 새로운 최고 점수!' : ''}
          </p>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={resetGame}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            다시 시작
          </button>
          <button
            onClick={resetAllStats}
            className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            통계 리셋
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4">
      <div className="absolute top-4 left-4 text-lg">
        <p>남은 시간: {timeLeft}초</p>
      </div>
      <div className="absolute top-4 right-4 text-lg text-right">
        <p>점수: {score}</p>
        <p>연속 정답: {streak}</p>
        <p>최고 점수: {highScore}</p>
      </div>

      <h1 className="text-4xl font-bold mb-8 text-center">이 포켓몬은 누구일까요?</h1>
      
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
            onKeyPress={handleKeyPress}
            placeholder="포켓몬 이름을 입력하세요" 
            className="px-4 py-2 border rounded-lg text-black w-64"
          />
          <div className="flex space-x-4 mt-4">
            <button 
              onClick={handleGuess}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
              disabled={!canGuess || isLoading}
            >
              정답 제출
            </button>
            <button 
              onClick={handleHint}
              className="px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 disabled:bg-gray-400"
              disabled={isHintUsed || isLoading}
            >
              힌트
            </button>
          </div>
          {isHintUsed && pokemon && (
            <p className="mt-4 text-lg">힌트: 이 포켓몬의 타입은 {pokemon.types.join(' / ')}입니다.</p>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <p className="mt-8 text-2xl font-bold text-center">{message}</p>
          <div className="mt-4">
            <p className="text-lg">정답: {pokemon?.name}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              타입: {pokemon?.types.join(' / ')}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizGame;
