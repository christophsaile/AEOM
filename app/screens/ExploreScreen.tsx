import React, { useState, useContext } from 'react';
import { SafeAreaView, StyleSheet, View, FlatList } from 'react-native';

import { IArticleFields } from '../types/generated/contentful';
import { client } from '../config/contentfulClient';
import colors from '../config/colors';
import Article from '../components/article';
import { GlobalStateContext } from '../globalStateContext';
import Header from '../components/header';

const ExploreScreen = () => {
  const { filteredArticles, setFilteredArticles, activeFilter, activeSort } = useContext(
    GlobalStateContext
  );
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    activeFilter === null
      ? client
          .getEntries<IArticleFields>({
            content_type: 'article',
            order: activeSort,
          })
          .then((response) => {
            setFilteredArticles(response);
          })
          .catch(console.error)
      : client
          .getEntries<IArticleFields>({
            content_type: 'article',
            'fields.category': activeFilter,
            order: activeSort,
          })
          .then((response) => {
            setFilteredArticles(response);
          })
          .catch(console.error);
    setRefreshing(false);
  };

  const renderHeader = () => {
    return <Header theme='explore' title='Explore' hasFilter={true} />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        contentContainerStyle={styles.list}
        data={filteredArticles?.items}
        renderItem={({ item }) => (
          <Article
            id={item.sys.id}
            image={item.fields.image}
            category={item.fields.category}
            headline={item.fields.headline}
            updatedAt={item.sys.updatedAt}
            text={item.fields.text}
            readingTime={item.fields.readingTime}
            author={item.fields.author}
          />
        )}
        keyExtractor={(item) => item.sys.id}
        ListHeaderComponent={renderHeader()}
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
    backgroundColor: colors.white,
  },
  list: {
    paddingTop: 40,
  },
});

export default ExploreScreen;
