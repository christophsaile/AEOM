import React from 'react';
import { Text, StyleSheet, View, Image } from 'react-native';
import BlogPost from './BlogPost';

const Blog = ({ posts }) => {
  return (
    <View>
      {posts.map((article, index: number) => (
        <BlogPost article={article} key={index} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({});

export default Blog;
