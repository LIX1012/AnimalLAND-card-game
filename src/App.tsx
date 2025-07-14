
import React from 'react';
import RPS from './components/RPS';
import Hand from './components/Hand';
import Board from './components/Board';
import GameStatus from './components/GameStatus';
import { useGameStore } from './store';

const App: React.FC = () => {
  const gamePhase = useGameStore(state => state.gamePhase);
  const winner = useGameStore(state => state.winner);
  const resetGame = useGameStore(state => state.resetGame);

  return (
    <div className="min-h-screen max-w-5xl mx-auto px-4 py-6 flex flex-col items-center space-y-8">
      <h1 className="text-2xl font-bold text-center">AnimalLAND 幻卡对战</h1>

      {gamePhase === 'rps' && <RPS />}

      {gamePhase !== 'rps' && (
        <>
          <GameStatus />

          <div className="w-full">
            <h2 className="text-lg font-semibold">敌方区域</h2>
            <Hand owner="ai" />
          </div>

          <Board />

          <div className="w-full">
            <h2 className="text-lg font-semibold">我方手牌</h2>
            <Hand owner="player" />
          </div>
        </>
      )}

      {gamePhase === 'ended' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white bg-opacity-80 backdrop-blur-sm z-50">
          <h2 className="text-3xl font-bold text-green-700 mb-4">
            {winner === 'player' ? '你获胜了！' : 'AI 获胜！'}
          </h2>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={resetGame}
          >
            再来一局
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
