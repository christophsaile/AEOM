import React from 'react';
import { Text, View, Image, StyleSheet, TouchableHighlight } from 'react-native';
import { useLinkProps, useNavigation } from '@react-navigation/native';

import { ArticleProps } from '../components/Article';
import colors from '../config/colors';
import { calcDateDifference } from '../helpers/calcDateDifference';
import fontSize from '../config/fontSize';

const BookmarkedArticle = ({ ...props }: ArticleProps) => {
  const navigation = useNavigation();

  return (
    <TouchableHighlight
      style={styles.article}
      underlayColor={colors.black}
      activeOpacity={0.9}
      onPress={() => navigation.navigate('ArticleDetailScreen', props)}
    >
      <View>
        <View style={styles.author}>
          <Image
            resizeMode='cover'
            style={styles.authorImg}
            source={{ uri: 'https:' + props.author.fields.portrait.fields.file.url }}
          />
          <Text style={styles.authorName}>{props.author.fields.name}</Text>
        </View>
        <View style={styles.main}>
          <Text numberOfLines={3} style={styles.title}>
            {props.headline}
          </Text>
          <Image
            resizeMode='cover'
            style={styles.img}
            source={{ uri: 'https:' + props.image.fields.file.url }}
          />
        </View>
        <View style={styles.footer}>
          <Text style={styles.category}>{props.category}</Text>
          <View style={styles.footerText}>
            <Text style={styles.date}>{calcDateDifference(props.updatedAt)}</Text>
            {props.readingTime && (
              <>
                <Text style={styles.spacer}>{'\u2022'}</Text>
                <Text style={styles.readingTime}>{props.readingTime + ' min'}</Text>
              </>
            )}
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );
};
const styles = StyleSheet.create({
  article: {
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: colors.black,
  },
  author: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
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
  main: {
    flex: 1,
    flexDirection: 'row',
    height: 80,
    marginBottom: 20,
  },
  title: {
    flex: 2,
    paddingRight: 10,
    fontWeight: 'bold',
    fontSize: fontSize.text,
  },
  img: { flex: 1 },
  footer: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  category: {
    color: colors.blue,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  footerText: {
    flexDirection: 'row',
  },
  spacer: {
    paddingHorizontal: 5,
    color: colors.grey,
  },
  date: {
    color: colors.grey,
  },
  readingTime: {
    color: colors.grey,
  },
});

export default BookmarkedArticle;
