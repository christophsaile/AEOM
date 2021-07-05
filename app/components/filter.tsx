import React, { useContext, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, Text, ScrollView, View } from 'react-native';

import colors from '../config/colors';
import fontSize from '../config/fontSize';
import { IArticleFields } from '../types/generated/contentful';
import { client } from '../config/contentfulClient';
import { GlobalStateContext } from '../globalStateContext';

const Filter = () => {
  const {
    unfilteredArticles,
    activeSort,
    activeFilter,
    setFilteredArticles,
    setActiveFilter,
  } = useContext(GlobalStateContext);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = React.useState<number | null>(null);

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

  const fetchData = () => {
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
  };

  useEffect(() => {
    fetchData();
  }, [activeFilter]);

  const handleFilterClick = (category: string, index: number) => {
    if (selectedCategoryIndex === index) {
      setActiveFilter(null);
      setSelectedCategoryIndex(null);
    } else {
      setActiveFilter(category);
      setSelectedCategoryIndex(index);
    }
  };

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.container}>
      {getAllCategorys().map((category, index) => {
        return (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            style={styles.filter}
            onPress={() => handleFilterClick(category, index)}
          >
            <Text
              style={[
                styles.filterText,
                { color: selectedCategoryIndex === index ? colors.blue : colors.grey },
              ]}
            >
              {category}
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
