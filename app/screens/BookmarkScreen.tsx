import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text } from 'react-native';
import { EntryCollection } from 'contentful';

import { saveArticle, deleteArticle, getAllArticles } from '../helpers/bookmarkAtricle';
import { IArticleFields } from '../types/generated/contentful';
import { client } from '../config/contentfulClient';
import colors from '../config/colors';

const BookmarkScreen = () => {
  const [contentfulData, setContentfulData] = useState<null | EntryCollection<IArticleFields>>(
    null
  );

  const getContentfulData = () => {
    client
      .getEntries<IArticleFields>({
        content_type: 'article',
        'sys.id[all]': 'DrbIyNgKDfz1Neh0X0K2i, 42pA5JF1vBXjLmFDMUqgnE',
      })
      .then((response) => {
        setContentfulData(response);
        console.log(response);
      })
      .catch(console.error);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.blue }}>
      <Text>Hello {contentfulData}</Text>
      {/* <FlatList
        data={contentfulData?.items}
        renderItem={({ item }) => (
          <Article
            image={item.fields.image}
            category={item.fields.category}
            headline={item.fields.headline}
            createdAt={item.sys.createdAt}
            text={item.fields.text}
            id={item.sys.id}
          />
        )}
        keyExtractor={(item) => item.sys.id}
        ListHeaderComponent={mainHeadline}
        showsVerticalScrollIndicator={false}
        refreshing={refreshing}
        onRefresh={() => onRefresh()}
      /> */}
    </SafeAreaView>
  );
};

export default BookmarkScreen;
