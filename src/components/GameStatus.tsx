
// src/components/GameStatus.tsx
import React from 'react';
import { useGameStore } from '../store';

const GameStatus: React.FC = () => {
  const playerHand = useGameStore(state => state.playerHand);
  const aiHand = useGameStore(state => state.aiHand);
  const board = useGameStore(state => state.board);

  const playerBoardCount = board.filter(cell => cell.card?.owner === 'player').length;
  const aiBoardCount = board.filter(cell => cell.card?.owner === 'ai').length;

  return (
    <div className="p-2 text-sm bg-white shadow rounded border mb-2">
      <div className="flex justify-between">
        <div>
          <strong>我方</strong>：手牌 {playerHand.length} 张，场上 {playerBoardCount} 张
        </div>
        <div>
          <strong>敌方</strong>：手牌 {aiHand.length} 张，场上 {aiBoardCount} 张
        </div>
      </div>
    </div>
  );
};

export default GameStatus;
