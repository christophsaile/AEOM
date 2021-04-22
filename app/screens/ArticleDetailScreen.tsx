import React from 'react';
import { SafeAreaView, Text, Image, StyleSheet, View, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

// @ts-ignore
import { contentfulRichTextToReactNative } from '../helpers/contentfulRichTextToReactNative';
import colors from '../config/colors';
import { StackScreenProps } from '@react-navigation/stack';
import { StackParamList } from '../../App';

type Props = StackScreenProps<StackParamList, 'ArticleDetailScreen'>;

const ArticleDetailScreen = ({ navigation, route }: Props) => {
  const { image, category, headline, text, createdAt } = route.params;

  return (
    <SafeAreaView style={{ backgroundColor: colors.white }}>
      <View style={styles.header}>
        <MaterialCommunityIcons
          name='arrow-left'
          size={24}
          color='black'
          onPress={navigation.goBack}
        />
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Details</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image style={styles.img} source={{ uri: 'https:' + image.fields.file.url }} />
        <View style={styles.header}>
          <Text>{category}</Text>
          <Text>{createdAt}</Text>
        </View>
        <Text style={styles.headline}>{headline}</Text>
        {documentToReactComponents(text, contentfulRichTextToReactNative)}
      </ScrollView>
    </SafeAreaView>
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

export default ArticleDetailScreen;
