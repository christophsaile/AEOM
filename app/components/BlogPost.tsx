import React, { useState } from 'react';
import { Text, StyleSheet, View, Image } from 'react-native';
import Markdown from 'react-native-markdown-display';
import colors from '../config/colors';

const BlogPost = ({ data }) => {
  const [isArticleOpen, setIsArticleOpen] = useState(false);
  const { headline, description, img, category, published } = data.fields;

  return (
    <View>
      onPress=
      {() => {
        setIsArticleOpen(true);
      }}
      <View>
        {img && <Image style={styles.img} source={{ uri: 'https:' + img.fields.file.url }} />}
        <View>
          <Text>{category}</Text>
          <Text>{published}</Text>
        </View>
        <Text>{headline}</Text>
      </View>
      <View style={[isArticleOpen ? styles.showArticle : styles.hideArticle]}>
        <Markdown>{description}</Markdown>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  showArticle: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    display: 'flex',
    backgroundColor: colors.white,
  },

  hideArticle: {
    display: 'none',
  },
  img: {
    width: 200,
    height: 300,
  },
});

export default BlogPost;
