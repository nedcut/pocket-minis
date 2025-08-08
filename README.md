# 📦 Pocket Minis

A mobile collectible game where users open digital blind packs, collect cute figurines, build dioramas, and trade safely with others. Built with React Native and Expo.

## 🌟 Features

### Core Gameplay
- **Pack Opening System**: Open packs to discover new minis with animated reveals
- **Collection Management**: View, filter, and sort your complete inventory
- **Daily Rewards**: Free daily packs with countdown timers
- **Rarity System**: Common, Rare, Epic, and Legendary minis with distinct visuals
- **Pity System**: Guaranteed rare+ mini every 30 pack opens (transparent and fair)

### Collections Available
- 🗡️ **Fantasy Heroes**: Knights, mages, and mythical warriors
- 🚀 **Space Explorers**: Astronauts, pilots, and cosmic adventurers  
- 🌊 **Ocean Depths**: Divers, sea creatures, and underwater treasures
- ✨ **Mystic Creatures**: Dragons, phoenixes, and magical beings

### User Experience
- **Intuitive Navigation**: Bottom tab navigation between core features
- **Smart Filtering**: Filter by rarity, collection, and sort by various criteria
- **Collection Stats**: Track progress with total, unique, and legendary counts
- **Responsive Design**: Optimized for mobile with smooth animations

## 🛠️ Tech Stack

- **Frontend**: React Native 0.79.5
- **Framework**: Expo SDK 53
- **State Management**: Zustand
- **Navigation**: React Navigation 7
- **Storage**: AsyncStorage for persistence
- **Language**: TypeScript
- **Styling**: StyleSheet with custom design system

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Expo CLI
- iOS Simulator (Mac) or Android Emulator

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/nedcut/pocket-minis.git
cd pocket-minis
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm start
```

4. **Run on device/simulator**
```bash
# iOS
npm run ios

# Android  
npm run android

# Web (for testing)
npm run web
```

### Development Commands

```bash
# Start Expo development server
npm start

# Run TypeScript check
npx tsc --noEmit

# View project structure
npx expo info
```

## 📱 Screenshots

*Coming soon - screenshots of pack opening, collection view, and daily rewards*

## 🎮 How to Play

1. **Daily Login**: Claim your free daily pack (1 mini + 50 gems)
2. **Open Packs**: Use gems to open packs and discover new minis
3. **Build Collection**: Collect all minis across different rarities and series
4. **Track Progress**: View detailed stats and filter your collection
5. **Complete Sets**: Work towards completing entire collections for bonuses

## 🎯 Game Economy

- **Starting Gems**: 100 gems to get you started
- **Pack Cost**: 10 gems per pack (3 minis per pack)
- **Daily Rewards**: 1 free mini + 50 gems every 24 hours
- **Drop Rates**: 
  - Common: 65%
  - Rare: 22%
  - Epic: 10%
  - Legendary: 3%

## 🔄 Pity System

Fair and transparent guarantee system:
- Counter increases with each pack opened
- At 30 packs without rare+, next pack guarantees rare or better
- Counter resets when rare+ mini is obtained
- Clearly displayed in the UI

## 🗂️ Project Structure

```
src/
├── components/          # Reusable UI components
│   └── MiniCard.tsx    # Mini display component
├── data/               # Static data and mock content
│   └── minis.ts        # Mini definitions and collections
├── screens/            # Main app screens
│   ├── HomeScreen.tsx        # Dashboard with daily rewards
│   ├── PackOpenScreen.tsx    # Pack opening interface
│   ├── CollectionScreen.tsx  # Inventory management
│   └── [other screens]
└── state/              # Global state management
    └── store.ts        # Zustand store configuration
```

## 🎨 Design System

### Colors
- **Common**: Gray (#9CA3AF)
- **Rare**: Blue (#3B82F6)
- **Epic**: Purple (#8B5CF6)
- **Legendary**: Gold (#F59E0B)

### Typography
- Headers: Bold, large text for impact
- Body: Medium weight for readability
- Labels: Small, muted for supporting info

## 🚧 Roadmap

### MVP (Current)
- ✅ Pack opening system
- ✅ Collection management
- ✅ Daily rewards
- ✅ Basic statistics

### Planned Features
- 🏗️ Diorama builder
- 🔄 Trading system
- 🎯 Achievement system
- 📱 Push notifications
- 🌐 User profiles
- 🎪 Seasonal events

## 🤝 Contributing

This is currently a personal project, but feedback and suggestions are welcome! Feel free to:

1. Open an issue for bugs or feature requests
2. Fork the repo and submit a pull request
3. Share ideas for new mini collections or features

## 📄 License

MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Ned Cutler** ([@nedcut](https://github.com/nedcut))

---

*Built with ❤️ for collectors and fans of cute digital collectibles*