import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import colors from './app/config/colors';
import ExploreScreen from './app/screens/ExploreScreen';
import ArticleDetailScreen from './app/screens/articleDetailScreen';
import BottomNavigator from './app/components/bottomNavigation';
import { ArticleProps } from './app/components/article';
import BookmarkScreen from './app/screens/bookmarkScreen';
import GlobalStateProvider from './app/globalStateContext';

export type StackParamList = {
  Home: undefined;
  ExploreScreen: undefined;
  ArticleDetailScreen: ArticleProps;
  BookmarkScreen: undefined;
};

const Stack = createStackNavigator<StackParamList>();

export default function App() {
  return (
    <GlobalStateProvider>
      <NavigationContainer>
        <StatusBar animated={true} backgroundColor={colors.white} barStyle={'dark-content'} />
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name='Home' component={BottomNavigator} />
          <Stack.Screen name='ExploreScreen' component={ExploreScreen} />
          <Stack.Screen name='ArticleDetailScreen' component={ArticleDetailScreen} />
          <Stack.Screen name='BookmarkScreen' component={BookmarkScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </GlobalStateProvider>
  );
}
