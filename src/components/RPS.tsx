
import React, { useState } from 'react';
import { useGameStore } from '../store';
import cards from '../cards';

const gestures = ['rock', 'paper', 'scissors'] as const;
type Gesture = typeof gestures[number];

const RPS: React.FC = () => {
  const setGamePhase = useGameStore(state => state.setGamePhase);
  const setHands = useGameStore(state => state.setHands);
  const setCurrentTurn = useGameStore.setState;
  const autoPlayAI = useGameStore.getState().autoPlayAI;

  const [playerChoice, setPlayerChoice] = useState<Gesture | null>(null);
  const [aiChoice, setAiChoice] = useState<Gesture | null>(null);
  const [result, setResult] = useState<string | null>(null);

  const determineWinner = (player: Gesture, ai: Gesture) => {
    if (player === ai) return 'draw';
    if (
      (player === 'rock' && ai === 'scissors') ||
      (player === 'scissors' && ai === 'paper') ||
      (player === 'paper' && ai === 'rock')
    ) {
      return 'player';
    }
    return 'ai';
  };

  const handleChoose = (gesture: Gesture) => {
    const ai = gestures[Math.floor(Math.random() * 3)];
    setPlayerChoice(gesture);
    setAiChoice(ai);

    const winner = determineWinner(gesture, ai);

    if (winner === 'draw') {
      setResult('平局！请重新出拳');
      setTimeout(() => {
        setPlayerChoice(null);
        setAiChoice(null);
        setResult(null);
      }, 1500);
      return;
    }

    setResult(winner === 'player' ? '你获胜！' : 'AI获胜！');

    setTimeout(() => {
      const shuffled = [...cards].sort(() => 0.5 - Math.random());
      const playerCards = shuffled.slice(0, 5);
      const aiCards = shuffled.slice(5, 10);
      setHands(playerCards, aiCards);
      setCurrentTurn({ currentTurn: winner });
      setGamePhase('playing');
      if (winner === 'ai') {
        setTimeout(() => autoPlayAI(), 500);
      }
    }, 1500);
  };

  return (
    <div className="text-center space-y-4">
      <h2 className="text-xl font-semibold">猜拳决定先后手</h2>
      <p className="text-sm text-gray-500">请选择出拳</p>
      <div className="flex justify-center space-x-4">
        {gestures.map(gesture => (
          <button
            key={gesture}
            onClick={() => handleChoose(gesture)}
            className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
            disabled={!!result}
          >
            {gesture === 'rock' ? '石头' : gesture === 'paper' ? '布' : '剪刀'}
          </button>
        ))}
      </div>

      {result && (
        <div className="mt-4 text-lg font-bold text-green-600">
          你出：{playerChoice === 'rock' ? '石头' : playerChoice === 'paper' ? '布' : '剪刀'}，AI出：{aiChoice === 'rock' ? '石头' : aiChoice === 'paper' ? '布' : '剪刀'}
          <br />
          {result}
        </div>
      )}
    </div>
  );
};

export default RPS;
