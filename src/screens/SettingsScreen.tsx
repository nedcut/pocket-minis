import React from 'react';
import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';
import GradientBackground from '../components/GradientBackground';
import { colors } from '../lib/theme';
import { useGameStore } from '../state/store';
import * as Haptics from 'expo-haptics';

export default function SettingsScreen() {
  const { resetGame, hapticsEnabled, setHapticsEnabled } = useGameStore();

  const confirmReset = () => {
    Alert.alert('Reset Game', 'This will clear your progress. Continue?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Reset', style: 'destructive', onPress: () => { Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning); resetGame(); } },
    ]);
  };

  return (
    <GradientBackground>
      <View style={styles.container}>
        <Text style={styles.title}>Settings</Text>
        <Text style={styles.subtitle}>Customize your app experience</Text>

        <Pressable style={styles.resetBtn} onPress={confirmReset}>
          <Text style={styles.resetText}>Reset Game Progress</Text>
        </Pressable>

        <View style={{ height: 16 }} />
        <Pressable
          style={[styles.toggle, hapticsEnabled && styles.toggleOn]}
          onPress={() => setHapticsEnabled(!hapticsEnabled)}
        >
          <Text style={[styles.toggleText, hapticsEnabled && styles.toggleTextOn]}>
            Haptics {hapticsEnabled ? 'On' : 'Off'}
          </Text>
        </Pressable>
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
  resetBtn: {
    marginTop: 16,
    backgroundColor: '#fee2e2',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  resetText: {
    color: '#b91c1c',
    fontWeight: '700',
  },
  toggle: {
    backgroundColor: '#e5e7eb',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: 'center',
  },
  toggleOn: {
    backgroundColor: '#dbeafe',
  },
  toggleText: {
    color: colors.textSecondary,
    fontWeight: '700',
  },
  toggleTextOn: {
    color: '#1d4ed8',
  },
});