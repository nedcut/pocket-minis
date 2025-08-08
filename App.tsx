import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';

import HomeScreen from './src/screens/HomeScreen';
import PackOpenScreen from './src/screens/PackOpenScreen';
import CollectionScreen from './src/screens/CollectionScreen';
import DioramaScreen from './src/screens/DioramaScreen';
import TradeScreen from './src/screens/TradeScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import SettingsScreen from './src/screens/SettingsScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#007AFF',
          tabBarInactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Packs" component={PackOpenScreen} />
        <Tab.Screen name="Collection" component={CollectionScreen} />
        <Tab.Screen name="Diorama" component={DioramaScreen} />
        <Tab.Screen name="Trade" component={TradeScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
