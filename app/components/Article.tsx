import React from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import colors from '../config/colors';
import { useNavigation } from '@react-navigation/native';
import { Asset } from 'contentful';

type Props = {
  image: Asset;
  category: string;
  headline: string;
  createdAt: string;
};

const Article = ({ ...data }: Props) => {
  const navigation = useNavigation();

  return (
    <TouchableHighlight
      underlayColor={colors.white}
      activeOpacity={0.9}
      onPress={() => navigation.navigate('ArticleDetailScreen', data)}
    >
      <View style={styles.article}>
        <Image style={styles.img} source={{ uri: 'https:' + data.image.fields.file.url }} />
        <View style={styles.header}>
          <Text>{data.category}</Text>
          <Text>{data.createdAt}</Text>
        </View>
        <Text style={styles.headline}>{data.headline}</Text>
        <View style={styles.footer}>{/* <Text></Text>
        <Image></Image> */}</View>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  article: {},
  img: {
    height: 120,
    width: 120,
  },
  header: {},
  headline: {},
  footer: {},
});

export default Article;
