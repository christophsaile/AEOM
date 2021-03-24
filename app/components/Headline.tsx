import React from 'react';
import { Text, StyleSheet } from 'react-native';

type Props = {
  title: string;
};

const Headline = (props: Props) => {
  return <Text style={styles.headline}>{props.title}</Text>;
};

const styles = StyleSheet.create({
  headline: {
    fontSize: 30,
  },
});

export default Headline;
