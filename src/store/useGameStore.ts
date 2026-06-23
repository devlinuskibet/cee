import { create } from 'zustand';

interface GameState {
  heartsCollected: number;
  moonClicks: number;
  starsFound: number;
  questsCompleted: number;
  secretLetterFound: boolean;
  unlockedMessages: string[];
  
  incrementHearts: () => void;
  incrementMoonClicks: () => void;
  incrementStarsFound: () => void;
  findSecretLetter: () => void;
  unlockMessage: (msg: string) => void;
  
  checkQuests: () => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  heartsCollected: 0,
  moonClicks: 0,
  starsFound: 0,
  questsCompleted: 0,
  secretLetterFound: false,
  unlockedMessages: [],

  incrementHearts: () => {
    set((state) => ({ heartsCollected: state.heartsCollected + 1 }));
    get().checkQuests();
  },
  
  incrementMoonClicks: () => {
    set((state) => ({ moonClicks: state.moonClicks + 1 }));
    get().checkQuests();
  },

  incrementStarsFound: () => {
    set((state) => ({ starsFound: state.starsFound + 1 }));
    get().checkQuests();
  },

  findSecretLetter: () => {
    set({ secretLetterFound: true });
    get().checkQuests();
  },

  unlockMessage: (msg: string) => {
    set((state) => {
      if (!state.unlockedMessages.includes(msg)) {
        return { unlockedMessages: [...state.unlockedMessages, msg] };
      }
      return state;
    });
  },

  checkQuests: () => {
    const state = get();
    let completed = 0;
    
    if (state.heartsCollected >= 5) completed++;
    if (state.moonClicks >= 10) completed++;
    if (state.starsFound >= 5) completed++; // Assumed target
    if (state.secretLetterFound) completed++;
    
    if (completed !== state.questsCompleted) {
      set({ questsCompleted: completed });
    }
  }
}));
