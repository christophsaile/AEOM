import React from 'react';
import { Text, StyleSheet, View, Image } from 'react-native';

import Headline from './Headline';

type Props = {
  headline: string;
  text: string;
  img: string;
};

const BlogPost = (props: Props) => {
  return (
    <View>
      <Headline title={props.headline} />
      <Image source={{ width: 200, height: 300, uri: props.img }} />
      <Text>{props.text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default BlogPost;
