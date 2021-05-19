import React, { useState } from 'react';
import { View, StyleSheet, Modal, TouchableOpacity, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import colors from '../config/colors';
import Headline from './headline';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import fontSize from '../config/fontSize';

type Theme = 'explore' | 'bookmark';

type Props = {
  title: string;
  theme: Theme;
};

const Header = (props: Props) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Headline color={colors.blue} typeOfHeadline={'h2'} title={props.title} />
      <MaterialCommunityIcons
        onPress={() => setModalVisible(!modalVisible)}
        name='sort'
        size={32}
        color={colors.blue}
      />
      <Modal
        animationType='slide'
        visible={modalVisible}
        transparent={true}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPressOut={() => {
            setModalVisible(!modalVisible);
          }}
          style={styles.modal}
        >
          <View style={styles.modalView}>
            <TouchableOpacity
              style={styles.options}
              onPress={() => {
                'hello world';
              }}
            >
              <Text style={styles.optionsText}>latest articles</Text>
              <MaterialCommunityIcons name='check' size={24} color={colors.blue} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.options}
              onPress={() => {
                'hello world';
              }}
            >
              <Text style={styles.optionsText}>oldest articles</Text>
              <MaterialCommunityIcons name='check' size={24} color={colors.blue} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.options}
              onPress={() => {
                'hello world';
              }}
            >
              <Text style={styles.optionsText}>shortest readingtime</Text>
              <MaterialCommunityIcons name='check' size={24} color={colors.blue} />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
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
  modal: {
    flex: 1,
  },
  modalView: {
    marginTop: 'auto',
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: colors.lightgrey,
  },
  options: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 30,
  },
  optionsText: {
    fontSize: fontSize.modal,
  },
});

export default Header;
