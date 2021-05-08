import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, FlatList } from 'react-native';
import { EntryCollection } from 'contentful';

import { IArticleFields } from '../types/generated/contentful';
import { client } from '../config/contentfulClient';
import colors from '../config/colors';
import Article from '../components/Article';
import Headline from '../components/Headline';

const ArticleOverviewScreen = () => {
  const [contentfulData, setContentfulData] = useState<null | EntryCollection<IArticleFields>>(
    null
  );
  const [refreshing, setRefreshing] = useState(false);

  const getContentfulData = () => {
    client
      .getEntries<IArticleFields>({
        content_type: 'article',
      })
      .then((response) => {
        setContentfulData(response);
        setRefreshing(false);
      })
      .catch(console.error);
  };

  const onRefresh = () => {
    setRefreshing(true);
    getContentfulData();
  };

  const mainHeadline = () => {
    return (
      <Text style={{ textAlign: 'center' }}>
        <Headline color={colors.blue} typeOfHeadline={'h1'} title={'AEOM'} />
      </Text>
    );
  };

  useEffect(() => {
    getContentfulData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={contentfulData?.items}
        renderItem={({ item }) => (
          <Article
            image={item.fields.image}
            category={item.fields.category}
            headline={item.fields.headline}
            updatedAt={item.sys.updatedAt}
            text={item.fields.text}
            readingTime={item.fields.readingTime}
            id={item.sys.id}
          />
        )}
        keyExtractor={(item) => item.sys.id}
        ListHeaderComponent={mainHeadline}
        showsVerticalScrollIndicator={false}
        refreshing={refreshing}
        onRefresh={() => onRefresh()}
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
