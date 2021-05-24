import React from 'react';
import { View, StyleSheet } from 'react-native';

import colors from '../config/colors';
import Headline from './headline';
import Sort from './sort';
import Filter from './filter';

type Theme = 'explore' | 'bookmark';

type Props = {
  title: string;
  theme: Theme;
};

const Header = (props: Props) => {
  return (
    <>
      <View style={styles.container}>
        <Headline color={colors.blue} typeOfHeadline={'h2'} title={props.title} />
        <Sort />
      </View>
      <Filter />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    borderBottomWidth: 1,
    borderBottomColor: colors.lightgrey,
    marginBottom: 40,
  },
});

export default Header;
