import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import { client } from '../config/contentfulClient';
import colors from '../config/colors';
import Article from '../components/Article';

const ArticleOverviewScreen = ({ navigation }) => {
  const [contentData, setContentData] = useState([]);

  useEffect(() => {
    client
      .getEntries({
        content_type: 'article',
      })
      .then((response) => {
        setContentData(response.items);
      })
      .catch(console.error);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
      <Text>AOEM</Text>
      <FlatList
        data={contentData}
        renderItem={({ item }) => <Article data={item} />}
        keyExtractor={(item, index) => 'key' + index}
      />
    </SafeAreaView>
  );
};

export default ArticleOverviewScreen;
