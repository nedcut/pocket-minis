import { create } from 'zustand';

export interface Mini {
  id: string;
  name: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  collection: string;
  count: number;
}

export interface GameState {
  gems: number;
  shards: number;
  pityCounter: number;
  inventory: Mini[];
  selectedBanner: string | null;
  setGems: (gems: number) => void;
  setShards: (shards: number) => void;
  setPityCounter: (counter: number) => void;
  addToInventory: (mini: Omit<Mini, 'count'>) => void;
  setSelectedBanner: (banner: string | null) => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  gems: 100,
  shards: 0,
  pityCounter: 0,
  inventory: [],
  selectedBanner: null,
  
  setGems: (gems: number) => set({ gems }),
  
  setShards: (shards: number) => set({ shards }),
  
  setPityCounter: (counter: number) => set({ pityCounter: counter }),
  
  addToInventory: (mini: Omit<Mini, 'count'>) => {
    const { inventory } = get();
    const existingMini = inventory.find(item => item.id === mini.id);
    
    if (existingMini) {
      set({
        inventory: inventory.map(item =>
          item.id === mini.id
            ? { ...item, count: item.count + 1 }
            : item
        )
      });
    } else {
      set({
        inventory: [...inventory, { ...mini, count: 1 }]
      });
    }
  },
  
  setSelectedBanner: (banner: string | null) => set({ selectedBanner: banner }),
}));