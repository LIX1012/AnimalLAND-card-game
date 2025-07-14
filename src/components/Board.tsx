
import React from 'react';
import { useGameStore } from '../store';
import CardDisplay from './CardDisplay';

const Board: React.FC = () => {
  const board = useGameStore(state => state.board);
  const playCard = useGameStore(state => state.playCard);
  const currentTurn = useGameStore(state => state.currentTurn);
  const playerHand = useGameStore(state => state.playerHand);
  const gamePhase = useGameStore(state => state.gamePhase);

  const handleDrop = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    const cardId = e.dataTransfer.getData('cardId');
    const card = playerHand.find(c => c.id.toString() === cardId);
    if (card && currentTurn === 'player' && gamePhase === 'playing') {
      playCard(card, index);
    }
  };

  return (
    <div className="grid grid-cols-3 gap-4 justify-center items-center mx-auto py-8 max-w-lg min-h-[200px]">
      {board.map((cell, idx) => {
        const borderClass =
          cell.card?.owner === 'player'
            ? 'border-8 border-blue-400'
            : cell.card?.owner === 'ai'
            ? 'border-8 border-red-400'
            : 'border-4 border-gray-400';

        return (
          <div
            key={idx}
            className={`w-32 h-40 rounded bg-gray-50 flex items-center justify-center ${borderClass}`}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e, idx)}
          >
            {cell.card ? (
              <div className="w-24 h-32 flex items-center justify-center">
                <CardDisplay card={cell.card} />
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
};

export default Board;
