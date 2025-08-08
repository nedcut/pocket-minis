import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  diorama: Array<string | null>; // 3x3 grid of mini ids or null
  hapticsEnabled: boolean;
  setGems: (gems: number) => void;
  setShards: (shards: number) => void;
  setPityCounter: (counter: number) => void;
  addToInventory: (mini: Omit<Mini, 'count'>) => void;
  setSelectedBanner: (banner: string | null) => void;
  placeMiniInDiorama: (slotIndex: number, miniId: string | null) => void;
  setHapticsEnabled: (enabled: boolean) => void;
  resetGame: () => void;
}

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      gems: 100,
      shards: 0,
      pityCounter: 0,
      inventory: [],
      selectedBanner: null,
      diorama: Array(9).fill(null),
      hapticsEnabled: true,

      setGems: (gems: number) => set({ gems }),

      setShards: (shards: number) => set({ shards }),

      setPityCounter: (counter: number) => set({ pityCounter: counter }),

      addToInventory: (mini: Omit<Mini, 'count'>) => {
        const { inventory, shards } = get();
        const existingMini = inventory.find(item => item.id === mini.id);
        const shardYieldByRarity: Record<Mini['rarity'], number> = {
          common: 1,
          rare: 4,
          epic: 12,
          legendary: 40,
        };

        if (existingMini) {
          set({
            inventory: inventory.map(item =>
              item.id === mini.id
                ? { ...item, count: item.count + 1 }
                : item
            ),
            shards: shards + shardYieldByRarity[existingMini.rarity],
          });
        } else {
          set({
            inventory: [...inventory, { ...mini, count: 1 }],
          });
        }
      },

      setSelectedBanner: (banner: string | null) => set({ selectedBanner: banner }),

      placeMiniInDiorama: (slotIndex: number, miniId: string | null) =>
        set((state) => {
          const next = [...state.diorama];
          next[slotIndex] = miniId;
          return { diorama: next };
        }),

      setHapticsEnabled: (enabled: boolean) => set({ hapticsEnabled: enabled }),

      resetGame: () =>
        set({
          gems: 100,
          shards: 0,
          pityCounter: 0,
          inventory: [],
          selectedBanner: null,
          diorama: Array(9).fill(null),
          hapticsEnabled: true,
        }),
    }),
    {
      name: 'pm-game-state',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        gems: state.gems,
        shards: state.shards,
        pityCounter: state.pityCounter,
        inventory: state.inventory,
        selectedBanner: state.selectedBanner,
        diorama: state.diorama,
        hapticsEnabled: state.hapticsEnabled,
      }),
      version: 1,
      migrate: (persistedState: any, version) => {
        return persistedState;
      },
    }
  )
);