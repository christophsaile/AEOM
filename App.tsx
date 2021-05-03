import React from 'react';
import { Platform, StatusBar, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import colors from './app/config/colors';
import ArticleOverviewScreen from './app/screens/ArticleOverviewScreen';
import ArticleDetailScreen from './app/screens/ArticleDetailScreen';
import BottomNavigator from './app/navigation/BottomNavigation';
import { ArticleProps } from './app/components/Article';
import BookmarkScreen from './app/screens/BookmarkScreen';

export type StackParamList = {
  Home: undefined;
  ArticleOverviewScreen: undefined;
  ArticleDetailScreen: ArticleProps;
  BookmarkScreen: undefined;
};

const Stack = createStackNavigator<StackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar animated={true} backgroundColor={colors.white} barStyle={'dark-content'} />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='Home' component={BottomNavigator} />
        <Stack.Screen name='ArticleOverviewScreen' component={ArticleOverviewScreen} />
        <Stack.Screen name='ArticleDetailScreen' component={ArticleDetailScreen} />
        <Stack.Screen name='BookmarkScreen' component={BookmarkScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  main: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  content: {
    padding: 20,
  },
});
