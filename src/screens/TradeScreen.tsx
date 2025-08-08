import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import GradientBackground from '../components/GradientBackground';
import { colors } from '../lib/theme';
import { useGameStore } from '../state/store';

export default function TradeScreen() {
  const { inventory } = useGameStore();
  const haveDuplicates = inventory.filter(m => m.count > 1);

  return (
    <GradientBackground>
      <View style={styles.container}>
        <Text style={styles.title}>Trading</Text>
        <Text style={styles.subtitle}>Trade minis with other collectors</Text>

        <View style={{ marginTop: 16 }}>
          {haveDuplicates.length === 0 ? (
            <Text style={{ color: colors.textSecondary }}>
              No duplicates yet. Open more packs to get trade fodder.
            </Text>
          ) : (
            <>
              <Text style={{ color: colors.textSecondary, marginBottom: 8 }}>
                You have {haveDuplicates.length} duplicate{haveDuplicates.length > 1 ? 's' : ''} to trade.
              </Text>
              <Pressable style={styles.cta} onPress={() => {}}>
                <Text style={styles.ctaText}>Create Mock Trade Room</Text>
              </Pressable>
            </>
          )}
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
  cta: {
    backgroundColor: colors.brand,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
    marginTop: 6,
  },
  ctaText: {
    color: 'white',
    fontWeight: '600',
  },
});