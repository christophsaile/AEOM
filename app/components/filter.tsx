import React, { useContext } from 'react';
import { StyleSheet, TouchableOpacity, Text, ScrollView, View } from 'react-native';

import colors from '../config/colors';
import fontSize from '../config/fontSize';
import { GlobalStateContext } from '../globalStateContext';
import { client } from '../config/contentfulClient';
import { IArticleFields } from '../types/generated/contentful';

const Filter = () => {
  const { unfilteredArticles, setFilteredArticles } = useContext(GlobalStateContext);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = React.useState<number | null>(null);

  const fetchCategoryItems = (category: string) => {
    client
      .getEntries<IArticleFields>({
        content_type: 'article',
        'fields.category': category,
      })
      .then((response) => setFilteredArticles(response))
      .catch(console.error);
  };

  const getAllCategorys = (): string[] => {
    let categorys: string[] = [];
    unfilteredArticles?.items.map((item) => {
      categorys.push(item.fields.category);
    });
    const uniqueCategorys = categorys.filter((value, index, self) => {
      return self.indexOf(value) === index;
    });

    return uniqueCategorys;
  };

  const handleFilterClick = (item: string, index: number) => {
    if (selectedCategoryIndex === index) {
      setFilteredArticles(unfilteredArticles);
      setSelectedCategoryIndex(null);
    } else {
      fetchCategoryItems(item);
      setSelectedCategoryIndex(index);
    }
  };

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.container}>
      {getAllCategorys().map((item, index) => {
        return (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            style={styles.filter}
            onPress={() => handleFilterClick(item, index)}
          >
            <Text
              style={[
                styles.filterText,
                { color: selectedCategoryIndex === index ? colors.blue : colors.grey },
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  filter: {
    marginRight: 10,
    padding: 5,
    paddingHorizontal: 20,
    borderRadius: 30,
    backgroundColor: colors.lightgrey,
  },
  filterText: {
    textAlign: 'center',
    fontSize: fontSize.text,
    fontWeight: 'bold',
  },
});

export default Filter;
