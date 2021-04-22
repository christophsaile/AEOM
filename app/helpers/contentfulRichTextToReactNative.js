import React from 'react';
import { Text, View } from 'react-native';
import { BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types';

import fontSize from '../config/fontSize';

export const contentfulRichTextToReactNative = {
  renderMark: {
    [MARKS.UNDERLINE]: (text) => {
      return <Text style={{ textDecorationLine: 'underline' }}>{text}</Text>;
    },
    [MARKS.BOLD]: (text) => {
      return <Text style={{ fontWeight: 'bold' }}>{text}</Text>;
    },
    [MARKS.ITALIC]: (text) => {
      return <Text style={{ fontStyle: 'italic' }}>{text}</Text>;
    },
    [MARKS.CODE]: (text) => {
      return <Text>{text}</Text>;
    },
  },
  renderNode: {
    [INLINES.HYPERLINK]: (node) => {
      return null;
    },
    [BLOCKS.EMBEDDED_ENTRY]: (node) => {
      return null;
    },
    [BLOCKS.PARAGRAPH]: (_node, children) => {
      return <Text>{children}</Text>;
    },
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      return null;
    },
    [BLOCKS.HEADING_1]: (_node, children) => (
      <Text style={{ fontSize: fontSize.h1 }}>{children}</Text>
    ),
    [BLOCKS.HEADING_2]: (_node, children) => (
      <Text style={{ fontSize: fontSize.h2 }}>{children}</Text>
    ),
    [BLOCKS.HEADING_3]: (_node, children) => (
      <Text style={{ fontSize: fontSize.h3 }}>{children}</Text>
    ),
    [BLOCKS.HEADING_4]: (_node, children) => (
      <Text style={{ fontSize: fontSize.h4 }}>{children}</Text>
    ),
    [BLOCKS.HEADING_5]: (_node, children) => (
      <Text style={{ fontSize: fontSize.h4 }}>{children}</Text>
    ),
    [BLOCKS.HEADING_6]: (_node, children) => (
      <Text style={{ fontSize: fontSize.h4 }}>{children}</Text>
    ),
    [BLOCKS.UL_LIST]: (_node, children) => {
      return children.map((child, i) => {
        return (
          <View key={i} style={{ display: 'flex', flexDirection: 'row' }}>
            <Text>{'\u2022'}</Text>
            <Text style={{ flex: 1, paddingLeft: 5 }}>{child}</Text>
          </View>
        );
      });
    },
    [BLOCKS.OL_LIST]: (_node, children) => {
      return children.map((child, i) => {
        return (
          <View key={i} style={{ display: 'flex', flexDirection: 'row' }}>
            <Text>{i + 1 + '.'}</Text>
            <Text style={{ flex: 1, paddingLeft: 5 }}>{child}</Text>
          </View>
        );
      });
    },
    [BLOCKS.LIST_ITEM]: (_node, child) => {
      return <View>{child}</View>;
    },
    [BLOCKS.QUOTE]: (_node, child) => {
      return <Text style={{ fontSize: fontSize.quote }}>{child}</Text>;
    },
    [BLOCKS.HR]: (_node, child) => {
      return <Text>{child}</Text>;
    },
  },
};
