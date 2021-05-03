import React, { useState } from 'react';
import { StyleSheet, View, Image, Text, Share, Button } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { Asset } from 'contentful';
import { Document } from '@contentful/rich-text-types';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import colors from '../config/colors';
import fontSize from '../config/fontSize';
import { saveArticle, deleteArticle, getAllArticles } from '../helpers/bookmarkAtricle';
import { useNonInitialEffect } from '../helpers/useNonInitalEffectHook';

export type ArticleProps = {
  image: Asset;
  category: string;
  headline: string;
  createdAt: string;
  text: Document;
  id: string;
};

const Article = ({ ...data }: ArticleProps) => {
  const navigation = useNavigation();

  const checkIfArticleIsBookmarked = (): boolean => {
    let returnValue: boolean = false;
    getAllArticles().then((response) => {
      if (typeof response === 'string') {
        const arryResponse: string[] = JSON.parse(response);
        returnValue = arryResponse.includes(data.id);
      }
    });
    return returnValue;
  };

  const [bookmark, setBookmark] = useState(checkIfArticleIsBookmarked);
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: data.headline,
        title: data.headline,
      });
    } catch (error) {
      alert(error.message);
    }
  };

  useNonInitialEffect(() => {
    bookmark ? saveArticle(data.id) : deleteArticle(data.id);
  }, [bookmark]);

  return (
    <View style={styles.article}>
      <Button
        title='show storage'
        onPress={() => {
          getAllArticles().then((token) => {
            console.log(token);
          });
        }}
      />
      <TouchableHighlight
        underlayColor={colors.white}
        activeOpacity={0.9}
        onPress={() => navigation.navigate('ArticleDetailScreen', data)}
      >
        <View>
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
        </View>
      </TouchableHighlight>
      <View style={styles.footer}>
        <Text style={styles.footerText}>Read more</Text>
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
            color={bookmark ? colors.blue : colors.grey}
            onPress={() => setBookmark(!bookmark)}
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
  footer: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  footerText: {
    color: colors.grey,
    textTransform: 'uppercase',
  },
  footerIcons: {
    display: 'flex',
    flexDirection: 'row',
  },
});

export default Article;
