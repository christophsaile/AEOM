import React from 'react';
import { SafeAreaView, Platform, StatusBar, StyleSheet } from 'react-native';
import BlogPost from './app/components/BlogPost';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <BlogPost
        headline='Hello World'
        img='https://picsum.photos/200/300'
        text='This is our first Blog Post!'
      ></BlogPost>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});
