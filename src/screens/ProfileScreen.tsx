import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import GradientBackground from '../components/GradientBackground';
import { colors, shadow } from '../lib/theme';
import { useGameStore } from '../state/store';

export default function ProfileScreen() {
  const { inventory, gems, shards } = useGameStore();
  const totalMinis = inventory.reduce((sum, m) => sum + m.count, 0);
  const uniqueMinis = inventory.length;
  const legendary = inventory.filter(m => m.rarity === 'legendary').length;

  return (
    <GradientBackground>
      <View style={styles.container}>
        <Text style={styles.title}>Profile</Text>
        <Text style={styles.subtitle}>Your collector profile and stats</Text>

        <View style={styles.statsRow}>
          <View style={styles.statCard}><Text style={styles.statNum}>{gems}</Text><Text style={styles.statLabel}>Gems</Text></View>
          <View style={styles.statCard}><Text style={styles.statNum}>{shards}</Text><Text style={styles.statLabel}>Shards</Text></View>
        </View>
        <View style={styles.statsRow}>
          <View style={styles.statCard}><Text style={styles.statNum}>{totalMinis}</Text><Text style={styles.statLabel}>Total</Text></View>
          <View style={styles.statCard}><Text style={styles.statNum}>{uniqueMinis}</Text><Text style={styles.statLabel}>Unique</Text></View>
          <View style={styles.statCard}><Text style={[styles.statNum, { color: '#F59E0B' }]}>{legendary}</Text><Text style={styles.statLabel}>Legendary</Text></View>
        </View>
      </View>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  },
  statCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    minWidth: 100,
    ...shadow.card,
  },
  statNum: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 4,
  },
});