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
    <View style={styles.header}>
      <Headline color={colors.blue} typeOfHeadline={'h2'} noMargin={true} title={props.title} />
      <Sort />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 15,
    marginHorizontal: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightgrey,
  },
});

export default Header;
