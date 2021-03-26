import React, { useState, useEffect } from 'react';
import { SafeAreaView, Platform, StatusBar, StyleSheet } from 'react-native';

import { client } from './app/lib/contentfulClient';

import BlogPost from './app/components/BlogPost';

export default function App() {
  const [blogPost, setBlogPost] = useState([]);

  console.log(process.env.CONTENTFUL_TOKEN);

  useEffect(() => {
    client
      .getEntries()
      .then((response) => {
        console.log(response);
      })
      .catch(console.error);
  });

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
