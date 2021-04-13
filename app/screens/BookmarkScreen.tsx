import React from 'react';
import { SafeAreaView, Text } from 'react-native';
import colors from '../config/colors';

const BookmarkScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.blue }}>
      <Text>BookMark</Text>
    </SafeAreaView>
  );
};

export default BookmarkScreen;
