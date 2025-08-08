export interface MiniData {
  id: string;
  name: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  collection: string;
  description: string;
  dropRate: number;
}

export const miniCollections = {
  'fantasy-heroes': 'Fantasy Heroes',
  'space-explorers': 'Space Explorers',
  'ocean-depths': 'Ocean Depths',
  'mystic-creatures': 'Mystic Creatures',
};

export const dummyMinis: MiniData[] = [
  {
    id: 'fh-001',
    name: 'Brave Knight',
    rarity: 'common',
    collection: 'fantasy-heroes',
    description: 'A valiant warrior with shining armor',
    dropRate: 0.4,
  },
  {
    id: 'fh-002',
    name: 'Forest Archer',
    rarity: 'common',
    collection: 'fantasy-heroes',
    description: 'Master of the bow and arrow',
    dropRate: 0.35,
  },
  {
    id: 'fh-003',
    name: 'Fire Mage',
    rarity: 'rare',
    collection: 'fantasy-heroes',
    description: 'Wielder of ancient flame magic',
    dropRate: 0.15,
  },
  {
    id: 'fh-004',
    name: 'Shadow Assassin',
    rarity: 'epic',
    collection: 'fantasy-heroes',
    description: 'Silent and deadly in the night',
    dropRate: 0.08,
  },
  {
    id: 'fh-005',
    name: 'Dragon Lord',
    rarity: 'legendary',
    collection: 'fantasy-heroes',
    description: 'Commander of ancient dragons',
    dropRate: 0.02,
  },
  {
    id: 'se-001',
    name: 'Space Cadet',
    rarity: 'common',
    collection: 'space-explorers',
    description: 'Rookie explorer of the cosmos',
    dropRate: 0.4,
  },
  {
    id: 'se-002',
    name: 'Asteroid Miner',
    rarity: 'common',
    collection: 'space-explorers',
    description: 'Harvester of space resources',
    dropRate: 0.35,
  },
  {
    id: 'se-003',
    name: 'Nebula Pilot',
    rarity: 'rare',
    collection: 'space-explorers',
    description: 'Navigator of cosmic storms',
    dropRate: 0.15,
  },
  {
    id: 'se-004',
    name: 'Quantum Engineer',
    rarity: 'epic',
    collection: 'space-explorers',
    description: 'Master of space-time technology',
    dropRate: 0.08,
  },
  {
    id: 'se-005',
    name: 'Galactic Emperor',
    rarity: 'legendary',
    collection: 'space-explorers',
    description: 'Ruler of distant star systems',
    dropRate: 0.02,
  },
  {
    id: 'od-001',
    name: 'Pearl Diver',
    rarity: 'common',
    collection: 'ocean-depths',
    description: 'Seeker of underwater treasures',
    dropRate: 0.4,
  },
  {
    id: 'od-002',
    name: 'Coral Guardian',
    rarity: 'rare',
    collection: 'ocean-depths',
    description: 'Protector of reef ecosystems',
    dropRate: 0.15,
  },
  {
    id: 'od-003',
    name: 'Kraken Tamer',
    rarity: 'legendary',
    collection: 'ocean-depths',
    description: 'Master of deep sea monsters',
    dropRate: 0.02,
  },
  {
    id: 'mc-001',
    name: 'Phoenix Chick',
    rarity: 'rare',
    collection: 'mystic-creatures',
    description: 'Young bird of eternal flame',
    dropRate: 0.15,
  },
  {
    id: 'mc-002',
    name: 'Unicorn Foal',
    rarity: 'epic',
    collection: 'mystic-creatures',
    description: 'Magical creature of purity',
    dropRate: 0.08,
  },
  {
    id: 'mc-003',
    name: 'Ancient Dragon',
    rarity: 'legendary',
    collection: 'mystic-creatures',
    description: 'Wise and powerful elder dragon',
    dropRate: 0.01,
  },
];

export const getRandomMini = (): MiniData => {
  const random = Math.random();
  let cumulativeRate = 0;
  
  for (const mini of dummyMinis) {
    cumulativeRate += mini.dropRate;
    if (random <= cumulativeRate) {
      return mini;
    }
  }
  
  return dummyMinis[0];
};

export const getMinisByCollection = (collection: string): MiniData[] => {
  return dummyMinis.filter(mini => mini.collection === collection);
};

export const getMinisByRarity = (rarity: string): MiniData[] => {
  return dummyMinis.filter(mini => mini.rarity === rarity);
};