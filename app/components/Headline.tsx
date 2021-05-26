import React from 'react';
import { Text, StyleSheet } from 'react-native';
import colors from '../config/colors';
import fontSize from '../config/fontSize';
import lineHeight from '../config/lineHeight';

type typeOfHeadline = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

type Props = {
  title: string;
  typeOfHeadline: typeOfHeadline;
  color?: string;
  noMargin?: true;
};

const Headline = (props: Props) => {
  return (
    <Text
      style={[
        styles[props.typeOfHeadline],
        {
          fontWeight: 'bold',
          color: props.color || colors.black,
          marginBottom: props.noMargin && 0,
        },
      ]}
    >
      {props.title}
    </Text>
  );
};

const styles = StyleSheet.create({
  h1: { fontSize: fontSize.h1, lineHeight: lineHeight.lhH1, marginBottom: 20 },
  h2: { fontSize: fontSize.h2, lineHeight: lineHeight.lhH2, marginBottom: 20 },
  h3: { fontSize: fontSize.h3, lineHeight: lineHeight.lhH3, marginBottom: 16 },
  h4: { fontSize: fontSize.h4, lineHeight: lineHeight.lhH4, marginBottom: 10 },
  h5: { fontSize: fontSize.h4, lineHeight: lineHeight.lhH4, marginBottom: 10 },
  h6: { fontSize: fontSize.h4, lineHeight: lineHeight.lhH4, marginBottom: 10 },
});

export default Headline;
