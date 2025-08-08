import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import GradientBackground from '../components/GradientBackground';
import { colors } from '../lib/theme';
import { useGameStore } from '../state/store';

export default function DioramaScreen() {
  const { diorama, placeMiniInDiorama, inventory } = useGameStore();
  const firstOwnedMini = inventory[0]?.id ?? null;

  return (
    <GradientBackground>
      <View style={styles.container}>
        <Text style={styles.title}>Diorama</Text>
        <Text style={styles.subtitle}>Create and customize your displays</Text>

        <View style={styles.grid}>
          {diorama.map((miniId, index) => (
            <Pressable
              key={index}
              style={[styles.cell, { borderColor: miniId ? colors.brand : '#D1D5DB' }]}
              onPress={() => placeMiniInDiorama(index, miniId ? null : firstOwnedMini)}
            >
              <Text style={styles.cellText}>{miniId ? '🧸' : '+'}</Text>
            </Pressable>
          ))}
        </View>

        <Text style={{ marginTop: 10, color: colors.textSecondary }}>
          Tap a cell to place/remove your first owned mini
        </Text>
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
  grid: {
    width: 300,
    aspectRatio: 1,
    marginTop: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  cell: {
    width: '33.3333%',
    height: '33.3333%',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cellText: {
    fontSize: 22,
    color: colors.textSecondary,
  },
});