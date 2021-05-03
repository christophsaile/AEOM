import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveArticle = async (id: string) => {
  try {
    const bookmarksString = await AsyncStorage.getItem('@MyStore:bookmarks');
    if (bookmarksString !== null) {
      const bookmarksArray: string[] = JSON.parse(bookmarksString);
      bookmarksArray.push(id);
      await AsyncStorage.setItem('@MyStore:bookmarks', JSON.stringify(bookmarksArray));
    } else {
      await AsyncStorage.setItem('@MyStore:bookmarks', JSON.stringify([id]));
    }
  } catch (e) {
    console.log(e);
  }
};

export const deleteArticle = async (id: string) => {
  try {
    const bookmarksString = await AsyncStorage.getItem('@MyStore:bookmarks');
    if (bookmarksString !== null) {
      let bookmarksArray: string[] = JSON.parse(bookmarksString);
      bookmarksArray = bookmarksArray.filter((item) => item !== id);
      await AsyncStorage.setItem('@MyStore:bookmarks', JSON.stringify(bookmarksArray));
    }
  } catch (e) {
    console.log(e);
  }
};

export const getAllArticles = async () => {
  try {
    const value = await AsyncStorage.getItem('@MyStore:bookmarks');
    if (value !== null) {
      return value;
    }
  } catch (e) {
    console.log(e);
  }
};
