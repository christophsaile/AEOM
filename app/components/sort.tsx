import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Modal } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import colors from '../config/colors';
import fontSize from '../config/fontSize';

const Sort = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [active, setActive] = useState(0);

  const data = [
    { index: 0, text: 'latest articles', action: 'latestA' },
    { index: 1, text: 'oldest articles', action: 'oldestA' },
    { index: 2, text: 'shortest reading time', action: 'shortestRT' },
  ];

  const sortData = (action: string) => {
    console.log(action);
  };

  return (
    <>
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
            sortData('hello world');
            setModalVisible(!modalVisible);
          }}
          style={styles.modal}
        >
          <View style={styles.modalView}>
            {data.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.options}
                onPress={() => {
                  setActive(index);
                }}
              >
                <Text style={styles.optionsText}>{item.text}</Text>
                {active === index && (
                  <MaterialCommunityIcons name='check' size={24} color={colors.blue} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
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

export default Sort;
