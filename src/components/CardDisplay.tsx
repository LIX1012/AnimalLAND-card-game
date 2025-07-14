
import React from 'react';
import { Card } from '../store';

type Props = {
  card: Card;
};

const CardDisplay: React.FC<Props> = ({ card }) => {
  return (
    <div
      className={`
        relative w-28 h-36 rounded-lg shadow-md bg-white
        border-4 \${card.owner === 'player' ? 'border-blue-400' : 'border-red-400'}
      `}
    >
      {/* 上方数值 */}
      <div className="absolute top-1 left-1/2 -translate-x-1/2 text-xs font-bold text-gray-700">
        {card.attack.top}
      </div>

      {/* 左侧数值 */}
      <div className="absolute top-1/2 left-1 text-xs font-bold text-gray-700 -translate-y-1/2">
        {card.attack.left}
      </div>

      {/* 右侧数值 */}
      <div className="absolute top-1/2 right-1 text-xs font-bold text-gray-700 -translate-y-1/2">
        {card.attack.right}
      </div>

      {/* 下方数值 */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs font-bold text-gray-700">
        {card.attack.bottom}
      </div>

      {/* 卡图 */}
      <img
        src={card.image}
        alt={card.name}
        className="w-full h-full object-cover rounded-md opacity-80"
      />

      {/* 名称 */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-xs font-semibold bg-white bg-opacity-70 px-1 rounded">
        {card.name}
      </div>

      {/* 稀有度 */}
      <div className="absolute bottom-0 right-1 text-[10px] font-semibold bg-yellow-100 text-yellow-600 px-1 rounded">
        {card.rarity}
      </div>
    </div>
  );
};

export default CardDisplay;
