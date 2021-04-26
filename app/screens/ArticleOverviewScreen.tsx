import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text } from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { EntryCollection } from 'contentful';

import { IArticleFields } from '../types/generated/contentful';
import { client } from '../config/contentfulClient';
import colors from '../config/colors';
import Article from '../components/Article';
import fontSize from '../config/fontSize';
import Headline from '../components/Headline';
import { color } from 'react-native-reanimated';

const ArticleOverviewScreen = () => {
  const [contentfulData, setContentfulData] = useState<null | EntryCollection<IArticleFields>>(
    null
  );

  useEffect(() => {
    client
      .getEntries<IArticleFields>({
        content_type: 'article',
      })
      .then((response) => {
        setContentfulData(response);
      })
      .catch(console.error);
  }, []);

  const mainHeadline = () => {
    return (
      <Text style={{ textAlign: 'center' }}>
        <Headline color={colors.blue} typeOfHeadline={'h1'} title={'AEOM'} />
      </Text>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={contentfulData?.items}
        renderItem={({ item }) => (
          <Article
            image={item.fields.image}
            category={item.fields.category}
            headline={item.fields.headline}
            createdAt={item.sys.createdAt}
            text={item.fields.text}
          />
        )}
        keyExtractor={(item) => item.sys.id}
        ListHeaderComponent={mainHeadline}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.white,
  },
});
export default ArticleOverviewScreen;
