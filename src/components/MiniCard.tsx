import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Mini } from '../state/store';
import { colors, radius, shadow, typography, rarityBackground } from '../lib/theme';

interface MiniCardProps {
  mini: Mini | Omit<Mini, 'count'>;
  onPress?: () => void;
  showCount?: boolean;
  size?: 'small' | 'medium' | 'large';
}

const RARITY_COLORS = colors.rarity;

const SIZE_CONFIGS = {
  small: {
    container: 80,
    fontSize: 10,
    nameSize: 12,
  },
  medium: {
    container: 120,
    fontSize: 12,
    nameSize: 14,
  },
  large: {
    container: 160,
    fontSize: 14,
    nameSize: 16,
  },
};

export default function MiniCard({ 
  mini, 
  onPress, 
  showCount = true, 
  size = 'medium' 
}: MiniCardProps) {
  const config = SIZE_CONFIGS[size];
  const rarityColor = RARITY_COLORS[mini.rarity];
  const rarityBgColor = rarityBackground[mini.rarity];

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.container,
        {
          width: config.container,
          height: config.container + 48,
          backgroundColor: rarityBgColor,
          borderColor: rarityColor,
        }
      ]}
    >
      <View style={[styles.imageContainer, { backgroundColor: rarityColor }]}>
        <Text style={[styles.placeholder, { fontSize: config.fontSize }]}>
          {mini.name.substring(0, 2).toUpperCase()}
        </Text>
      </View>
      
      <Text 
        style={[styles.name, { fontSize: config.nameSize }]} 
        numberOfLines={2}
      >
        {mini.name}
      </Text>
      
      <Text style={[styles.rarity, { color: rarityColor, fontSize: config.fontSize }]}>
        {mini.rarity.toUpperCase()}
      </Text>
      
      {showCount && 'count' in mini && mini.count > 1 && (
        <View style={styles.countBadge}>
          <Text style={styles.countText}>x{mini.count}</Text>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: radius.md,
    borderWidth: 2,
    padding: 10,
    alignItems: 'center',
    margin: 6,
    ...shadow.card,
  },
  imageContainer: {
    width: '80%',
    aspectRatio: 1,
    borderRadius: radius.sm,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  placeholder: {
    color: 'white',
    fontWeight: 'bold',
  },
  name: {
    fontWeight: '700',
    textAlign: 'center',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  rarity: {
    fontSize: 10,
    fontWeight: '600',
  },
  countBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: colors.danger,
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  countText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
});