import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { EntryCollection } from 'contentful';

import { IArticleFields } from '../types/generated/contentful';
import { client } from '../config/contentfulClient';
import colors from '../config/colors';
import Article from '../components/Article';

const ArticleOverviewScreen = ({ navigation }) => {
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

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
      <Text>AOEM</Text>
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
        keyExtractor={(item, index) => 'key' + index}
      />
    </SafeAreaView>
  );
};

export default ArticleOverviewScreen;
