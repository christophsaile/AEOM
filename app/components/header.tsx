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
  hasFilter?: boolean;
};

const Header = (props: Props) => {
  return (
    <View style={styles.header}>
      <View style={styles.container}>
        <Headline color={colors.blue} typeOfHeadline={'h2'} noMargin={true} title={props.title} />
        <Sort />
      </View>
      {props.hasFilter && <Filter />}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    marginBottom: 20,
    marginLeft: 20,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 15,
    marginRight: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightgrey,
  },
});

export default Header;
