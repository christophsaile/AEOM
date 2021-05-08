import React from 'react';
import { View, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import colors from '../config/colors';

import Headline from './headline';

type Theme = 'explore' | 'bookmark';

type Props = {
  title: string;
  theme: Theme;
};

const Header = (props: Props) => {
  return (
    <View style={styles.container}>
      <Headline
        color={props.theme === 'explore' ? colors.blue : colors.white}
        typeOfHeadline={'h2'}
        title={props.title}
      />
      <MaterialCommunityIcons name='sort' size={32} color={colors.black} />
    </View>
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
