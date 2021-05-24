import React from 'react';
import 'react-native-gesture-handler';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import ExploreScreen from '../screens/exploreScreen';
import BookmarkScreen from '../screens/bookmarkScreen';
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
        name='ExploreScreen'
        component={ExploreScreen}
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
