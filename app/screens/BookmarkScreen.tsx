import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

import colors from '../config/colors';

const BookmarkScreen = () => {
  const [savedArticles, setSavedArticles] = useState(null);

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;
      getAllArticles();
      return () => {
        isActive = false;
      };
    }, [savedArticles])
  );

  const getAllArticles = async () => {
    try {
      const value = await AsyncStorage.getItem('@MyStore:bookmarks');
      if (value !== null) {
        setSavedArticles(JSON.parse(value));
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.blue }}>
      <FlatList
        data={savedArticles}
        renderItem={({ item }) => <Text>{item}</Text>}
        keyExtractor={(item, index) => 'key' + index}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default BookmarkScreen;
