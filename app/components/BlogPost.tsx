import React from 'react';
import { Text, StyleSheet, View, Image } from 'react-native';
import Markdown from 'react-native-markdown-display';

import Headline from './Headline';

const BlogPost = ({ article }) => {
  const { headline, description, img } = article.fields;

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
