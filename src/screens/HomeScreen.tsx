import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Pressable,
  Alert 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useGameStore } from '../state/store';
import { getRandomMini } from '../data/minis';
import MiniCard from '../components/MiniCard';
import GradientBackground from '../components/GradientBackground';
import { colors, radius, shadow, typography } from '../lib/theme';
import * as Haptics from 'expo-haptics';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation<any>();
  const { 
    gems, 
    shards,
    inventory, 
    addToInventory, 
    setGems,
    hapticsEnabled,
  } = useGameStore();
  
  const [dailyPackClaimed, setDailyPackClaimed] = useState(false);
  const [timeUntilNextPack, setTimeUntilNextPack] = useState('');
  const [featuredMini, setFeaturedMini] = useState<any>(null);

  useEffect(() => {
    const initializeScreen = async () => {
      // Check if daily pack was claimed today
      const lastClaimDate = await AsyncStorage.getItem('lastDailyPackClaim');
      const today = new Date().toDateString();
      
      if (lastClaimDate !== today) {
        setDailyPackClaimed(false);
      } else {
        setDailyPackClaimed(true);
      }

      // Set a featured mini
      setFeaturedMini(getRandomMini());
    };

    initializeScreen();

    // Update countdown timer
    const updateTimer = () => {
      const now = new Date();
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);
      
      const timeLeft = tomorrow.getTime() - now.getTime();
      const hours = Math.floor(timeLeft / (1000 * 60 * 60));
      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      
      setTimeUntilNextPack(`${hours}h ${minutes}m`);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const claimDailyPack = async () => {
    if (dailyPackClaimed) {
      Alert.alert('Already Claimed', 'You have already claimed your daily pack today!');
      return;
    }

    // Give daily rewards
    const newMini = getRandomMini();
    addToInventory(newMini);
    setGems(gems + 50); // Daily gem bonus
    
    setDailyPackClaimed(true);
    
    // Store claim date
    await AsyncStorage.setItem('lastDailyPackClaim', new Date().toDateString());
    
    if (hapticsEnabled) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
    Alert.alert(
      'Daily Pack Claimed!', 
      `You received ${newMini.name} and 50 gems!`
    );
  };

  const getCollectionStats = () => {
    const stats = {
      total: inventory.reduce((sum, mini) => sum + mini.count, 0),
      unique: inventory.length,
      legendary: inventory.filter(m => m.rarity === 'legendary').length,
    };
    return stats;
  };

  const stats = getCollectionStats();

  return (
    <GradientBackground>
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Pocket Minis</Text>
        <Text style={styles.subtitle}>Collect, Trade, Display</Text>
        
        <View style={styles.currencyContainer}>
          <View style={styles.currencyItem}>
            <Text style={styles.currencyAmount}>💎 {gems}</Text>
            <Text style={styles.currencyLabel}>Gems</Text>
          </View>
          <View style={styles.currencyItem}>
            <Text style={styles.currencyAmount}>🔷 {shards}</Text>
            <Text style={styles.currencyLabel}>Shards</Text>
          </View>
          <View style={styles.currencyItem}>
            <Text style={styles.currencyAmount}>{stats.total}</Text>
            <Text style={styles.currencyLabel}>Total Minis</Text>
          </View>
          <View style={styles.currencyItem}>
            <Text style={[styles.currencyAmount, styles.legendaryText]}>{stats.legendary}</Text>
            <Text style={styles.currencyLabel}>Legendary</Text>
          </View>
        </View>
      </View>

      {/* Daily Pack */}
      <View style={styles.dailySection}>
        <Text style={styles.sectionTitle}>Daily Rewards</Text>
        <View style={styles.dailyCard}>
          <View style={styles.dailyInfo}>
            <Text style={styles.dailyTitle}>
              {dailyPackClaimed ? 'Pack Claimed!' : 'Free Daily Pack'}
            </Text>
            <Text style={styles.dailySubtitle}>
              {dailyPackClaimed 
                ? `Next pack in ${timeUntilNextPack}`
                : '1 Mini + 50 Gems'
              }
            </Text>
          </View>
          <Pressable
            style={[
              styles.dailyButton,
              dailyPackClaimed && styles.disabledButton
            ]}
            onPress={claimDailyPack}
            disabled={dailyPackClaimed}
          >
            <Text style={[
              styles.dailyButtonText,
              dailyPackClaimed && styles.disabledButtonText
            ]}>
              {dailyPackClaimed ? 'Claimed' : 'Claim'}
            </Text>
          </Pressable>
        </View>
      </View>

      {/* Featured Mini */}
      {featuredMini && (
        <View style={styles.featuredSection}>
          <Text style={styles.sectionTitle}>Featured Mini</Text>
          <View style={styles.featuredCard}>
            <MiniCard 
              mini={featuredMini} 
              size="large" 
              showCount={false}
            />
            <View style={styles.featuredInfo}>
              <Text style={styles.featuredName}>{featuredMini.name}</Text>
              <Text style={styles.featuredDescription}>{featuredMini.description}</Text>
              <Text style={[
                styles.featuredRarity,
                { color: getRarityColor(featuredMini.rarity) }
              ]}>
                {featuredMini.rarity.toUpperCase()}
              </Text>
            </View>
          </View>
        </View>
      )}

      {/* Quick Stats */}
      <View style={styles.statsSection}>
        <Text style={styles.sectionTitle}>Collection Progress</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{stats.unique}</Text>
            <Text style={styles.statLabel}>Unique Minis</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>4</Text>
            <Text style={styles.statLabel}>Collections</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={[styles.statNumber, styles.legendaryText]}>{stats.legendary}</Text>
            <Text style={styles.statLabel}>Legendary</Text>
          </View>
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.actionsSection}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          <Pressable style={styles.actionButton} onPress={() => navigation.navigate('Packs')}>
            <Text style={styles.actionEmoji}>📦</Text>
            <Text style={styles.actionText}>Open Packs</Text>
          </Pressable>
          <Pressable style={styles.actionButton} onPress={() => navigation.navigate('Diorama')}>
            <Text style={styles.actionEmoji}>🏠</Text>
            <Text style={styles.actionText}>Build Diorama</Text>
          </Pressable>
          <Pressable style={styles.actionButton} onPress={() => navigation.navigate('Trade')}>
            <Text style={styles.actionEmoji}>🔄</Text>
            <Text style={styles.actionText}>Trade</Text>
          </Pressable>
          <Pressable style={styles.actionButton} onPress={() => navigation.navigate('Profile')}>
            <Text style={styles.actionEmoji}>👤</Text>
            <Text style={styles.actionText}>Profile</Text>
          </Pressable>
        </View>
      </View>

      {/* Tips */}
      <View style={styles.tipsSection}>
        <Text style={styles.sectionTitle}>Pro Tips</Text>
        <View style={styles.tipCard}>
          <Text style={styles.tipText}>
            💡 Complete sets to earn special badges and profile themes!
          </Text>
        </View>
        <View style={styles.tipCard}>
          <Text style={styles.tipText}>
            🎯 The pity system guarantees a rare+ mini every 30 pack opens.
          </Text>
        </View>
      </View>
    </ScrollView>
    </GradientBackground>
  );
}

const getRarityColor = (rarity: string) => {
  const colors = {
    common: '#9CA3AF',
    rare: '#3B82F6',
    epic: '#8B5CF6',
    legendary: '#F59E0B',
  };
  return colors[rarity as keyof typeof colors] || '#9CA3AF';
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 40,
  },
  header: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 20,
  },
  currencyContainer: {
    flexDirection: 'row',
    gap: 20,
  },
  currencyItem: {
    alignItems: 'center',
  },
  currencyAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  currencyLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 4,
  },
  legendaryText: {
    color: colors.warning,
  },
  dailySection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 12,
  },
  dailyCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...shadow.card,
  },
  dailyInfo: {
    flex: 1,
  },
  dailyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  dailySubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 4,
  },
  dailyButton: {
    backgroundColor: colors.success,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  disabledButton: {
    backgroundColor: '#d1d5db',
  },
  dailyButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  disabledButtonText: {
    color: colors.textSecondary,
  },
  featuredSection: {
    padding: 20,
    paddingTop: 0,
  },
  featuredCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    ...shadow.card,
  },
  featuredInfo: {
    flex: 1,
    marginLeft: 16,
  },
  featuredName: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  featuredDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    marginVertical: 4,
  },
  featuredRarity: {
    fontSize: 12,
    fontWeight: '600',
  },
  statsSection: {
    padding: 20,
    paddingTop: 0,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    ...shadow.card,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 4,
  },
  actionsSection: {
    padding: 20,
    paddingTop: 0,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  actionButton: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    width: '47%',
    ...shadow.card,
  },
  actionEmoji: {
    fontSize: 24,
    marginBottom: 8,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textPrimary,
  },
  tipsSection: {
    padding: 20,
    paddingTop: 0,
    paddingBottom: 40,
  },
  tipCard: {
    backgroundColor: '#f0f9ff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#3b82f6',
  },
  tipText: {
    fontSize: 14,
    color: '#1e40af',
    lineHeight: 20,
  },
});