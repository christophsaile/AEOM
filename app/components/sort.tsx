import React, { useState, useContext } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Modal } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import colors from '../config/colors';
import fontSize from '../config/fontSize';
import { GlobalStateContext } from '../globalStateContext';

const Sort = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [active, setActive] = useState(0);
  const { unfilteredArticles, setUnfilteredArticles } = useContext(GlobalStateContext);

  const data = [
    { index: 0, text: 'latest unfilteredArticles', action: 'latestA' },
    { index: 1, text: 'oldest unfilteredArticles', action: 'oldestA' },
    { index: 2, text: 'shortest reading time', action: 'shortestRT' },
  ];

  const sortData = (action: string) => {
    if (unfilteredArticles?.items) {
      switch (action) {
        case 'latestA':
          break;
        case 'oldestA':
          const sortData = unfilteredArticles.items.sort((a, b) => {
            const dateA = new Date(a.sys.updatedAt).valueOf();
            const dateB = new Date(b.sys.updatedAt).valueOf();
            return dateA - dateB;
          });
          break;
        case 'shortestRT':
          break;
      }
    } else {
      console.log('no items found to filter');
    }
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
            sortData(data[active].action);
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
