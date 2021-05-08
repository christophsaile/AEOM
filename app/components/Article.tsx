import React, { useContext } from 'react';
import { StyleSheet, View, Image, Text, Share, TouchableHighlight } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Asset } from 'contentful';
import { Document } from '@contentful/rich-text-types';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import colors from '../config/colors';
import fontSize from '../config/fontSize';
import { calcDateDifference } from '../helpers/calcDateDifference';
import { GlobalStateContext } from '../globalStateContext';
import { IAuthor } from '../types/generated/contentful';

export type ArticleProps = {
  id: string;
  image: Asset;
  category: string;
  headline: string;
  updatedAt: string;
  text: Document;
  readingTime?: number;
  author: IAuthor;
};

const Article = ({ ...props }: ArticleProps) => {
  const navigation = useNavigation();
  const { bookmarkedArticles, addBookmarkedArticle, deleteBookmarkedArticle } = useContext(
    GlobalStateContext
  );

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: props.headline,
        title: props.headline,
      });
    } catch (error) {
      alert(error.message);
    }
  };

  const handleBookmark = () => {
    bookmarkedArticles.includes(props.id)
      ? deleteBookmarkedArticle(props.id)
      : addBookmarkedArticle(props.id);
  };

  return (
    <View style={styles.article}>
      <TouchableHighlight
        underlayColor={colors.white}
        activeOpacity={0.9}
        onPress={() => navigation.navigate('ArticleDetailScreen', props)}
      >
        <View>
          <Image
            resizeMode='contain'
            style={styles.img}
            source={{ uri: 'https:' + props.image.fields.file.url }}
          />
          <View style={styles.header}>
            <Text style={styles.category}>{props.category}</Text>
            <Text style={styles.spacer}>{'\u2022'}</Text>
            <Text style={styles.date}>{calcDateDifference(props.updatedAt)}</Text>
          </View>
          <Text style={styles.headline}>{props.headline}</Text>
        </View>
      </TouchableHighlight>
      <View style={styles.footer}>
        <TouchableHighlight
          style={styles.footerTextContainer}
          underlayColor={colors.white}
          activeOpacity={0.9}
          onPress={() => navigation.navigate('ArticleDetailScreen', props)}
        >
          <>
            <Text style={styles.footerText}>Read more</Text>
            {props.readingTime && (
              <>
                <Text style={styles.spacer}>{'\u2022'}</Text>
                <Text style={styles.footerText}>{props.readingTime + ' min'}</Text>
              </>
            )}
          </>
        </TouchableHighlight>
        <View style={styles.footerIcons}>
          <MaterialCommunityIcons
            style={{ paddingRight: 30 }}
            name='share-variant'
            size={22}
            color={colors.grey}
            onPress={onShare}
          />
          <MaterialCommunityIcons
            name='bookmark-minus-outline'
            size={24}
            color={bookmarkedArticles.includes(props.id) ? colors.blue : colors.grey}
            onPress={() => handleBookmark()}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  article: {
    display: 'flex',
    flex: 1,
    marginBottom: 40,
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
  footer: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  footerTextContainer: {
    flexDirection: 'row',
  },
  footerText: {
    color: colors.grey,
  },
  footerIcons: {
    display: 'flex',
    flexDirection: 'row',
  },
});

export default Article;
