import React from 'react';
import 'react-native-gesture-handler';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import ArticleOverviewScreen from '../screens/ArticleOverviewScreen';
import BookmarkScreen from '../screens/BookmarkScreen';
import colors from '../config/colors';

const Tab = createBottomTabNavigator();

const BottomNavigator = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        style: {
          height: 55,
        },
        showLabel: false,
        activeTintColor: colors.blue,
      }}
    >
      <Tab.Screen
        name='ArticleOverviewScreen'
        component={ArticleOverviewScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name='home-minus-outline' size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name='BookmarkScreen'
        component={BookmarkScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name='bookmark-minus-outline' size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigator;
