import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, Text, Share, Button, TouchableHighlight } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Asset } from 'contentful';
import { Document } from '@contentful/rich-text-types';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import colors from '../config/colors';
import fontSize from '../config/fontSize';
import { saveArticle, deleteArticle, getAllArticles } from '../helpers/bookmarkAtricle';
import { useNonInitialEffect } from '../helpers/useNonInitalEffectHook';
import { calcDateDifference } from '../helpers/calcDateDifference';

export type ArticleProps = {
  image: Asset;
  category: string;
  headline: string;
  createdAt: string;
  text: Document;
  readingTime?: number;
  id: string;
};

const Article = ({ ...data }: ArticleProps) => {
  const navigation = useNavigation();

  const [bookmark, setBookmark] = useState(false);
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

  useEffect(() => {
    getAllArticles().then((response) => {
      if (response !== undefined) {
        const arryResponse: string[] = JSON.parse(response);
        setBookmark(arryResponse.includes(data.id));
      }
    });
  }, []);

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
            <Text style={styles.date}>{calcDateDifference(data.createdAt)}</Text>
          </View>
          <Text style={styles.headline}>{data.headline}</Text>
        </View>
      </TouchableHighlight>
      <View style={styles.footer}>
        <TouchableHighlight
          style={styles.footerTextContainer}
          underlayColor={colors.white}
          activeOpacity={0.9}
          onPress={() => navigation.navigate('ArticleDetailScreen', data)}
        >
          <>
            <Text style={styles.footerText}>Read more</Text>
            {data.readingTime && (
              <>
                <Text style={styles.spacer}>{'\u2022'}</Text>
                <Text style={styles.footerText}>{data.readingTime + ' min'}</Text>
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
