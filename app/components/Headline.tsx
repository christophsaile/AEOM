import React from 'react';
import { Text, StyleSheet } from 'react-native';
import colors from '../config/colors';

type Props = {
  title: string;
};

const Headline = (props: Props) => {
  return <Text style={styles.headline}>{props.title}</Text>;
};

const styles = StyleSheet.create({
  headline: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.black,
  },
});

export default Headline;
