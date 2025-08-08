import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Pressable, 
  ScrollView, 
  Alert,
  Animated
} from 'react-native';
import { useGameStore } from '../state/store';
import { getRandomMini, miniCollections, dummyMinis } from '../data/minis';
import MiniCard from '../components/MiniCard';

export default function PackOpenScreen() {
  const { gems, pityCounter, addToInventory, setGems, setPityCounter } = useGameStore();
  const [openedMinis, setOpenedMinis] = useState<any[]>([]);
  const [isOpening, setIsOpening] = useState(false);
  const [selectedBanner, setSelectedBanner] = useState('fantasy-heroes');
  const [scaleAnim] = useState(new Animated.Value(1));

  const PACK_COST = 10;
  const PITY_THRESHOLD = 30;

  const openPack = async () => {
    if (gems < PACK_COST) {
      Alert.alert('Not Enough Gems', 'You need more gems to open a pack!');
      return;
    }

    setIsOpening(true);
    
    // Pack opening animation
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.8,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1.2,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();

    // Simulate pack opening delay
    setTimeout(() => {
      const newMinis: any[] = [];
      const currentPity = pityCounter + 1;
      
      // Open 3 minis per pack
      for (let i = 0; i < 3; i++) {
        let mini = getRandomMini();
        
        // Pity system - guarantee rare+ at pity threshold
        if (currentPity >= PITY_THRESHOLD && mini.rarity === 'common') {
          const rareOrBetter = [
            ...getFilteredMinisByRarity(['rare', 'epic', 'legendary'])
          ];
          mini = rareOrBetter[Math.floor(Math.random() * rareOrBetter.length)];
        }
        
        newMinis.push(mini);
        addToInventory(mini);
      }
      
      setOpenedMinis(newMinis);
      setGems(gems - PACK_COST);
      
      // Reset pity if we got a rare or better
      const hasRareOrBetter = newMinis.some(mini => 
        ['rare', 'epic', 'legendary'].includes(mini.rarity)
      );
      setPityCounter(hasRareOrBetter ? 0 : currentPity);
      
      setIsOpening(false);
    }, 1000);
  };

  const getFilteredMinisByRarity = (rarities: string[]) => {
    return dummyMinis.filter((mini: any) => 
      rarities.includes(mini.rarity) && mini.collection === selectedBanner
    );
  };

  const clearResults = () => {
    setOpenedMinis([]);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Pack Opening</Text>
        <View style={styles.currencyContainer}>
          <Text style={styles.gems}>💎 {gems}</Text>
          <Text style={styles.pity}>Pity: {pityCounter}/{PITY_THRESHOLD}</Text>
        </View>
      </View>

      <View style={styles.bannerSection}>
        <Text style={styles.sectionTitle}>Select Banner</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {Object.entries(miniCollections).map(([key, name]) => (
            <Pressable
              key={key}
              style={[
                styles.bannerButton,
                selectedBanner === key && styles.selectedBanner
              ]}
              onPress={() => setSelectedBanner(key)}
            >
              <Text style={[
                styles.bannerText,
                selectedBanner === key && styles.selectedBannerText
              ]}>
                {name}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      <View style={styles.packSection}>
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          <Pressable
            style={[
              styles.packButton,
              (isOpening || gems < PACK_COST) && styles.disabledPack
            ]}
            onPress={openPack}
            disabled={isOpening || gems < PACK_COST}
          >
            <Text style={styles.packEmoji}>📦</Text>
            <Text style={styles.packText}>
              {isOpening ? 'Opening...' : `Open Pack (${PACK_COST} 💎)`}
            </Text>
          </Pressable>
        </Animated.View>
      </View>

      {openedMinis.length > 0 && (
        <View style={styles.resultsSection}>
          <View style={styles.resultsHeader}>
            <Text style={styles.sectionTitle}>Pack Results</Text>
            <Pressable onPress={clearResults} style={styles.clearButton}>
              <Text style={styles.clearButtonText}>Clear</Text>
            </Pressable>
          </View>
          <View style={styles.minisGrid}>
            {openedMinis.map((mini, index) => (
              <MiniCard
                key={`${mini.id}-${index}`}
                mini={mini}
                showCount={false}
                size="large"
              />
            ))}
          </View>
        </View>
      )}

      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>Drop Rates</Text>
        <Text style={styles.infoText}>Common: 65% • Rare: 22% • Epic: 10% • Legendary: 3%</Text>
        <Text style={styles.infoText}>Pity system guarantees rare+ every {PITY_THRESHOLD} opens</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 10,
  },
  currencyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  gems: {
    fontSize: 18,
    fontWeight: '600',
    color: '#059669',
  },
  pity: {
    fontSize: 16,
    color: '#6b7280',
  },
  bannerSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 12,
  },
  bannerButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#e5e7eb',
    borderRadius: 20,
    marginRight: 8,
  },
  selectedBanner: {
    backgroundColor: '#3b82f6',
  },
  bannerText: {
    fontSize: 14,
    color: '#4b5563',
    fontWeight: '500',
  },
  selectedBannerText: {
    color: 'white',
  },
  packSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  packButton: {
    backgroundColor: '#10b981',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    minWidth: 200,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  disabledPack: {
    backgroundColor: '#9ca3af',
    opacity: 0.6,
  },
  packEmoji: {
    fontSize: 40,
    marginBottom: 8,
  },
  packText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
  resultsSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  clearButton: {
    padding: 8,
    backgroundColor: '#ef4444',
    borderRadius: 8,
  },
  clearButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  minisGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
  },
  infoSection: {
    padding: 20,
    backgroundColor: '#f1f5f9',
    margin: 20,
    borderRadius: 12,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
});