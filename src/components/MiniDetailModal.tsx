import React from 'react';
import { Modal, View, Text, StyleSheet, Pressable } from 'react-native';
import { Mini } from '../state/store';
import { colors, radius, shadow } from '../lib/theme';
import MiniCard from './MiniCard';

interface MiniDetailModalProps {
  visible: boolean;
  mini: Mini | null;
  onClose: () => void;
}

export default function MiniDetailModal({ visible, mini, onClose }: MiniDetailModalProps) {
  if (!mini) return null;

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.backdrop}>
        <View style={styles.content}>
          <MiniCard mini={mini} size="large" />
          <Text style={styles.name}>{mini.name}</Text>
          <Text style={styles.meta}>Rarity: {mini.rarity.toUpperCase()}</Text>
          <Text style={styles.meta}>Collection: {mini.collection}</Text>
          {'count' in mini && mini.count > 1 && (
            <Text style={styles.meta}>You own: {mini.count}</Text>
          )}
          <Pressable style={styles.closeBtn} onPress={onClose}>
            <Text style={styles.closeText}>Close</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  content: {
    width: '100%',
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
    padding: 20,
    alignItems: 'center',
    ...shadow.card,
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.textPrimary,
    marginTop: 8,
  },
  meta: {
    marginTop: 4,
    color: colors.textSecondary,
  },
  closeBtn: {
    marginTop: 16,
    backgroundColor: colors.brand,
    borderRadius: radius.md,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  closeText: {
    color: 'white',
    fontWeight: '600',
  },
});


