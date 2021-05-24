import React, { useState, useContext, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import colors from '../config/colors';
import fontSize from '../config/fontSize';
import { GlobalStateContext } from '../globalStateContext';

const Filter = () => {
  const { articles, setArticles } = useContext(GlobalStateContext);
  const getAllCategorys = (): string[] => {
    let categorys: string[] = [];
    articles?.items.map((item) => {
      categorys.push(item.fields.category);
    });
    const uniqueCategorys = categorys.filter((value, index, self) => {
      return self.indexOf(value) === index;
    });

    return uniqueCategorys;
  };

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.container}>
      {getAllCategorys().map((item, index) => {
        return (
          <TouchableOpacity key={index} style={styles.filter}>
            <Text style={styles.filterText}>{item}</Text>
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
    padding: 5,
    borderRadius: 10,
    backgroundColor: colors.blue,
  },
  filterText: {
    fontSize: fontSize.text,
    color: colors.white,
  },
});

export default Filter;
