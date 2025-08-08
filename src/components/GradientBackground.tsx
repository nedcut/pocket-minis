import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Defs, LinearGradient, Stop, Rect } from 'react-native-svg';
import { colors } from '../lib/theme';

interface GradientBackgroundProps {
  children?: React.ReactNode;
  height?: number | string;
}

export default function GradientBackground({ children, height = '100%' }: GradientBackgroundProps) {
  return (
    <View style={styles.container}>
      <Svg width="100%" height={height} style={StyleSheet.absoluteFill}>
        <Defs>
          <LinearGradient id="bgGradient" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0%" stopColor="#EEF2FF" />
            <Stop offset="60%" stopColor="#F8FAFC" />
            <Stop offset="100%" stopColor="#FFFFFF" />
          </LinearGradient>
        </Defs>
        <Rect x={0} y={0} width="100%" height="100%" fill="url(#bgGradient)" />
      </Svg>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});


