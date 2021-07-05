import React, { useState, useContext, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Modal } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import colors from '../config/colors';
import fontSize from '../config/fontSize';
import { GlobalStateContext } from '../globalStateContext';
import { IArticleFields } from '../types/generated/contentful';
import { client } from '../config/contentfulClient';

const Sort = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [active, setActive] = useState(0);
  const { setFilteredArticles, setActiveSort, activeSort, activeFilter } = useContext(
    GlobalStateContext
  );

  const data = [
    { index: 0, text: 'recent articles', action: '-sys.updatedAt' },
    { index: 1, text: 'oldest articles', action: 'sys.updatedAt' },
    { index: 2, text: 'shortest reading time', action: '' },
  ];

  useEffect(() => {
    fetchData();
  }, [activeSort]);

  const sortData = (action: string) => {
    setActiveSort(action);
  };

  const fetchData = () => {
    activeFilter === null
      ? client
          .getEntries<IArticleFields>({
            content_type: 'article',
            order: activeSort,
          })
          .then((response) => {
            setFilteredArticles(response);
          })
          .catch(console.error)
      : client
          .getEntries<IArticleFields>({
            content_type: 'article',
            'fields.category': activeFilter,
            order: activeSort,
          })
          .then((response) => {
            setFilteredArticles(response);
          })
          .catch(console.error);
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
