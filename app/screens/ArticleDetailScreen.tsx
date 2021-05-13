import React from 'react';
import { SafeAreaView, Text, Image, StyleSheet, View, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

// @ts-ignore
import { contentfulRichTextToReactNative } from '../helpers/contentfulRichTextToReactNative';
import colors from '../config/colors';
import { StackScreenProps } from '@react-navigation/stack';
import { StackParamList } from '../../App';
import Headline from '../components/headline';
import { calcDateDifference } from '../helpers/calcDateDifference';
import Author from '../components/author';

type Props = StackScreenProps<StackParamList, 'ArticleDetailScreen'>;

const ArticleDetailScreen = ({ navigation, route }: Props) => {
  const { image, category, headline, text, updatedAt, author, readingTime } = route.params;

  return (
    <SafeAreaView style={styles.articleDetail}>
      <View style={styles.nav}>
        <MaterialCommunityIcons
          name='arrow-left'
          size={32}
          color='white'
          onPress={navigation.goBack}
        />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image
          resizeMode='cover'
          style={styles.img}
          source={{ uri: 'https:' + image.fields.file.url }}
        />
        <View style={styles.content}>
          <View style={styles.header}>
            <Author data={author} />
            {readingTime && (
              <>
                <Text style={styles.spacer}>{'\u2022'}</Text>
                <Text style={styles.readingTime}>{readingTime + ' min'}</Text>
              </>
            )}
          </View>
          <Headline title={headline} typeOfHeadline={'h2'} />
          <View style={styles.footer}>
            <Text style={styles.category}>{category}</Text>
            <Text style={styles.spacer}>{'\u2022'}</Text>
            <Text style={styles.date}>{calcDateDifference(updatedAt)}</Text>
          </View>
          {documentToReactComponents(text, contentfulRichTextToReactNative)}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  articleDetail: {
    display: 'flex',
    flex: 1,
    backgroundColor: colors.white,
  },
  nav: {
    position: 'absolute',
    top: 10,
    left: 20,
    padding: 5,
    backgroundColor: colors.black,
    borderRadius: 100,
    zIndex: 2,
  },
  img: {
    height: 280,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginBottom: 10,
  },
  content: {
    paddingTop: 10,
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
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
  footer: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 40,
  },
  readingTime: {
    color: colors.grey,
  },
});

export default ArticleDetailScreen;
