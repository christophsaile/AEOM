import React from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { Asset } from 'contentful';
import { Document } from '@contentful/rich-text-types';

import colors from '../config/colors';
import fontSize from '../config/fontSize';

type Props = {
  image: Asset;
  category: string;
  headline: string;
  createdAt: string;
  text: Document;
};

const Article = ({ ...data }: Props) => {
  const navigation = useNavigation();

  return (
    <TouchableHighlight
      underlayColor={colors.white}
      activeOpacity={0.9}
      onPress={() => navigation.navigate('ArticleDetailScreen', data)}
    >
      <View style={styles.article}>
        <Image
          resizeMode='contain'
          style={styles.img}
          source={{ uri: 'https:' + data.image.fields.file.url }}
        />
        <View style={styles.header}>
          <Text style={styles.category}>{data.category}</Text>
          <Text style={styles.spacer}>{'\u2022'}</Text>
          <Text style={styles.date}>{data.createdAt}</Text>
        </View>
        <Text style={styles.headline}>{data.headline}</Text>
        <View style={styles.footer}>{/* <Text></Text>
        <Image></Image> */}</View>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  article: {
    display: 'flex',
    flex: 1,
    marginTop: 30,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightgrey,
  },
  img: { flex: 1, aspectRatio: 1 },
  header: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 10,
  },
  category: {
    color: colors.blue,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  spacer: {
    paddingHorizontal: 5,
    color: colors.grey,
  },
  date: {
    color: colors.grey,
  },
  headline: {
    marginTop: 10,
    fontSize: fontSize.h2,
    fontWeight: 'bold',
  },
  footer: {},
});

export default Article;
