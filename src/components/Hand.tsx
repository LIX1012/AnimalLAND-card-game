
import React from 'react';
import { useGameStore } from '../store';
import CardDisplay from './CardDisplay';

type Props = {
  owner: 'player' | 'ai';
};

const Hand: React.FC<Props> = ({ owner }) => {
  const hand = useGameStore(state => owner === 'player' ? state.playerHand : state.aiHand);
  const playCard = useGameStore(state => state.playCard);
  const currentTurn = useGameStore(state => state.currentTurn);
  const gamePhase = useGameStore(state => state.gamePhase);

  return (
    <div className="flex space-x-2 justify-center flex-wrap mt-2">
      {hand.map(card => (
        <div
          key={card.id}
          draggable={owner === 'player'}
          onDragStart={(e) => {
            if (owner === 'player' && currentTurn === 'player') {
              e.dataTransfer.setData('cardId', card.id.toString());
            }
          }}
          className={`select-none \${owner === 'player' ? 'cursor-pointer hover:scale-105 transition-transform' : ''}`}
        >
          <CardDisplay card={card} />
        </div>
      ))}
    </div>
  );
};

export default Hand;
