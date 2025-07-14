
import { create } from 'zustand';
import cards from './cards';

export type Card = typeof cards[0] & {
  owner: 'player' | 'ai';
};

export type Cell = {
  index: number;
  card: Card | null;
};

type State = {
  board: Cell[];
  playerHand: Card[];
  aiHand: Card[];
  currentTurn: 'player' | 'ai';
  winner: 'player' | 'ai' | 'draw' | null;
  gamePhase: 'rps' | 'playing' | 'ended';
  autoPlayAI: () => void;
  setGamePhase: (phase: State['gamePhase']) => void;
  setWinner: (winner: State['winner']) => void;
  setHands: (player: Card[], ai: Card[]) => void;
  playCard: (card: Card, cellIndex: number) => void;
  resetGame: () => void;
};

export const useGameStore = create<State>((set, get) => ({
  board: Array.from({ length: 9 }, (_, index) => ({ index, card: null })),
  playerHand: [],
  aiHand: [],
  currentTurn: 'player',
  winner: null,
  gamePhase: 'rps',
  setGamePhase: (phase) => set({ gamePhase: phase }),
  setWinner: (winner) => set({ winner }),
  setHands: (player, ai) =>
    set({
      playerHand: player.map(c => ({ ...c, owner: 'player' })),
      aiHand: ai.map(c => ({ ...c, owner: 'ai' })),
    }),
  resetGame: () =>
    set({
      board: Array.from({ length: 9 }, (_, index) => ({ index, card: null })),
      playerHand: [],
      aiHand: [],
      currentTurn: 'player',
      winner: null,
      gamePhase: 'rps',
    }),
  autoPlayAI: () => {
    const { aiHand, board } = get();
    const emptyCells = board.filter(cell => cell.card === null);
    if (aiHand.length === 0 || emptyCells.length === 0) return;
    const randomCard = aiHand[0];
    const targetIndex = emptyCells[0].index;
    get().playCard(randomCard, targetIndex);
  },
  playCard: (card, cellIndex) => {
    const state = get();
    const board = [...state.board];
    const cell = board[cellIndex];

    if (!cell || cell.card) return;

    // 放置卡牌
    board[cellIndex] = { ...cell, card };

    // 翻转相邻卡
    const directions = [
      { dx: 0, dy: -1, side: 'top', opposite: 'bottom' },
      { dx: 1, dy: 0, side: 'right', opposite: 'left' },
      { dx: 0, dy: 1, side: 'bottom', opposite: 'top' },
      { dx: -1, dy: 0, side: 'left', opposite: 'right' },
    ];

    const row = Math.floor(cellIndex / 3);
    const col = cellIndex % 3;

    directions.forEach(({ dx, dy, side, opposite }) => {
      const newRow = row + dy;
      const newCol = col + dx;

      if (newRow >= 0 && newRow < 3 && newCol >= 0 && newCol < 3) {
        const neighborIndex = newRow * 3 + newCol;
        const neighborCell = board[neighborIndex];

        if (
          neighborCell.card &&
          neighborCell.card.owner !== card.owner &&
          card.attack[side] > neighborCell.card.attack[opposite]
        ) {
          // 翻转归属
          board[neighborIndex] = {
            ...neighborCell,
            card: {
              ...neighborCell.card,
              owner: card.owner,
            },
          };
        }
      }
    });

    if (card.owner === 'player') {
      set(state => ({
        board,
        playerHand: state.playerHand.filter(c => c.id !== card.id),
        currentTurn: 'ai',
      }));
      setTimeout(() => get().autoPlayAI(), 500);
    } else {
      set(state => ({
        board,
        aiHand: state.aiHand.filter(c => c.id !== card.id),
        currentTurn: 'player',
      }));
    }

    // 检查是否结束
    const allFilled = board.every(cell => cell.card !== null);
    if (allFilled) {
      const playerCount = board.filter(c => c.card?.owner === 'player').length;
      const aiCount = board.filter(c => c.card?.owner === 'ai').length;
      const winner =
        playerCount > aiCount
          ? 'player'
          : aiCount > playerCount
          ? 'ai'
          : 'draw';
      set({ gamePhase: 'ended', winner });
    }
  },
}));

