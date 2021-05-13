import React from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';

import { IAuthor } from '../types/generated/contentful';
import colors from '../config/colors';

type Props = {
  data: IAuthor;
};

const Author = (props: Props) => {
  const author = props.data.fields;
  return (
    <View style={styles.author}>
      <Image
        resizeMode='cover'
        style={styles.authorImg}
        source={{ uri: 'https:' + author.portrait.fields.file.url }}
      />
      <Text style={styles.authorName}>{author.name}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  author: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorImg: {
    width: 24,
    aspectRatio: 1,
    marginRight: 10,
    borderRadius: 99,
  },
  authorName: {
    color: colors.grey,
  },
});
export default Author;
