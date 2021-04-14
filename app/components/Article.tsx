import React from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import colors from '../config/colors';
import { useNavigation } from '@react-navigation/native';

const Article = ({ data }) => {
  const navigation = useNavigation();
  const { image, category, headline, sys } = data.fields;
  const { createdAt } = data.sys;

  return (
    <TouchableHighlight
      underlayColor={colors.white}
      activeOpacity={0.9}
      onPress={() => navigation.navigate('ArticleDetailScreen', data)}
    >
      <View style={styles.article}>
        <Image style={styles.img} source={{ uri: 'https:' + image.fields.file.url }} />
        <View style={styles.header}>
          <Text>{category}</Text>
          <Text>{createdAt}</Text>
        </View>
        <Text style={styles.headline}>{headline}</Text>
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
