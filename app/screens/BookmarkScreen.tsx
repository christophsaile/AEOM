import React, { useContext } from 'react';
import { SafeAreaView, StyleSheet, FlatList, Text, View } from 'react-native';

import colors from '../config/colors';
import { GlobalStateContext } from '../globalStateContext';
import BookmarkedArticle from '../components/bookmarkedArticle';
import Header from '../components/header';

const BookmarkScreen = () => {
  const { unfilteredArticles, bookmarkedArticles } = useContext(GlobalStateContext);

  let bookmarkedArticlesData = unfilteredArticles?.items.filter((item) =>
    bookmarkedArticles.includes(item.sys.id)
  );

  const renderHeader = () => {
    return <Header theme='bookmark' title='Reading list' />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        contentContainerStyle={styles.list}
        data={bookmarkedArticlesData}
        renderItem={({ item }) => (
          <BookmarkedArticle
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
        keyExtractor={(item, index) => 'key' + index}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={renderHeader()}
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

export default BookmarkScreen;
