import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from './src/screens/HomeScreen';
import PackOpenScreen from './src/screens/PackOpenScreen';
import CollectionScreen from './src/screens/CollectionScreen';
import DioramaScreen from './src/screens/DioramaScreen';
import TradeScreen from './src/screens/TradeScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import { colors } from './src/lib/theme';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer
      theme={{
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          background: colors.background,
          primary: colors.brand,
          text: colors.textPrimary,
          card: colors.surface,
          border: colors.border,
          notification: colors.brand,
        },
      }}
    >
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: colors.brand,
          tabBarInactiveTintColor: colors.muted,
          tabBarStyle: {
            backgroundColor: colors.surface,
            borderTopColor: colors.border,
            height: 60,
            paddingBottom: 8,
          },
          tabBarIcon: ({ color, size, focused }) => {
            const iconSize = focused ? size + 2 : size;
            switch (route.name) {
              case 'Home':
                return <Ionicons name="home" size={iconSize} color={color} />;
              case 'Packs':
                return <Ionicons name="cube" size={iconSize} color={color} />;
              case 'Collection':
                return <Ionicons name="grid" size={iconSize} color={color} />;
              case 'Diorama':
                return <Ionicons name="easel" size={iconSize} color={color} />;
              case 'Trade':
                return <Ionicons name="swap-horizontal" size={iconSize} color={color} />;
              case 'Profile':
                return <Ionicons name="person" size={iconSize} color={color} />;
              case 'Settings':
                return <Ionicons name="settings" size={iconSize} color={color} />;
              default:
                return <Ionicons name="ellipse" size={iconSize} color={color} />;
            }
          },
          tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarLabel: 'Home' }} />
        <Tab.Screen name="Packs" component={PackOpenScreen} options={{ tabBarLabel: 'Packs' }} />
        <Tab.Screen name="Collection" component={CollectionScreen} options={{ tabBarLabel: 'Collection' }} />
        <Tab.Screen name="Diorama" component={DioramaScreen} options={{ tabBarLabel: 'Diorama' }} />
        <Tab.Screen name="Trade" component={TradeScreen} options={{ tabBarLabel: 'Trade' }} />
        <Tab.Screen name="Profile" component={ProfileScreen} options={{ tabBarLabel: 'Profile' }} />
        <Tab.Screen name="Settings" component={SettingsScreen} options={{ tabBarLabel: 'Settings' }} />
      </Tab.Navigator>
      <StatusBar style="dark" />
    </NavigationContainer>
  );
}
