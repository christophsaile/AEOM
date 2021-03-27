import React, { useState, useEffect } from 'react';
import { SafeAreaView, Platform, StatusBar, StyleSheet, ScrollView } from 'react-native';

import { client } from './app/lib/contentfulClient';
import Blog from './app/components/Blog';

export default function App() {
  const [blogPost, setBlogPost] = useState([]);

  useEffect(() => {
    client
      .getEntries()
      .then((response) => {
        setBlogPost(response.items as any);
      })
      .catch(console.error);
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Blog posts={blogPost} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});
