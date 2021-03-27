import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { client } from '../config/contentfulClient';
import BlogPost from './BlogPost';

const Blog = () => {
  const [blogData, setBlogData] = useState([]);

  useEffect(() => {
    client
      .getEntries({
        content_type: 'blogPost',
      })
      .then((response) => {
        setBlogData(response.items);
      })
      .catch(console.error);
  }, []);

  return (
    <View>
      {blogData.map((article, index: number) => (
        <BlogPost key={index} data={article} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({});

export default Blog;
