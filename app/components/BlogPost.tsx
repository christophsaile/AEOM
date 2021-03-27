import React from 'react';
import { Text, StyleSheet, View, Image, ScrollView } from 'react-native';
import Markdown from 'react-native-markdown-display';

import Headline from './Headline';

const BlogPost = ({ data }) => {
  const { headline, description, img, author } = data.fields;

  return (
    <View>
      <Headline title={headline} />
      {img && <Image style={styles.img} source={{ uri: 'https:' + img.fields.file.url }} />}
      <Markdown>{description}</Markdown>
    </View>
  );
};

const styles = StyleSheet.create({
  img: {
    width: 200,
    height: 300,
  },
});

export default BlogPost;
