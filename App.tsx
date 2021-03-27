import React from 'react';
import { SafeAreaView, Platform, StatusBar, StyleSheet, ScrollView } from 'react-native';

import Blog from './app/components/Blog';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Blog />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});
