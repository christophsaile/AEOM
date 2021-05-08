import React, { useContext } from 'react';
import { SafeAreaView, Text, FlatList } from 'react-native';

import colors from '../config/colors';
import { BookmarkContext } from '../helpers/bookmarkContext';

const BookmarkScreen = () => {
  const { bookmarkedArticles } = useContext(BookmarkContext);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.blue }}>
      <FlatList
        data={bookmarkedArticles}
        renderItem={({ item }) => <Text>{item}</Text>}
        keyExtractor={(item, index) => 'key' + index}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default BookmarkScreen;
