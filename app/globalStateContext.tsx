import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useState, useEffect, FC } from 'react';
import { EntryCollection } from 'contentful';

import { IArticleFields } from './types/generated/contentful';
import { client } from './config/contentfulClient';

type Context = {
  unfilteredArticles: EntryCollection<IArticleFields> | null;
  filteredArticles: EntryCollection<IArticleFields> | null;
  bookmarkedArticles: string[];
  activeSort: string;
  activeFilter: string | null;
  setUnfilteredArticles: (unfilteredArticles: EntryCollection<IArticleFields> | null) => void;
  setFilteredArticles: (unfilteredArticles: EntryCollection<IArticleFields> | null) => void;
  addBookmarkedArticle: (id: string) => void;
  deleteBookmarkedArticle: (id: string) => void;
  setActiveSort: (sortOption: string) => void;
  setActiveFilter: (category: string | null) => void;
};

const contextDefaultValues: Context = {
  unfilteredArticles: null,
  filteredArticles: null,
  bookmarkedArticles: [],
  activeSort: '',
  activeFilter: null,
  setUnfilteredArticles: () => {},
  setFilteredArticles: () => {},
  addBookmarkedArticle: () => {},
  deleteBookmarkedArticle: () => {},
  setActiveFilter: () => {},
  setActiveSort: () => {},
};

export const GlobalStateContext = createContext<Context>(contextDefaultValues);

const GlobalStateProvider: FC = ({ children }) => {
  const [
    unfilteredArticles,
    setUnfilteredArticles,
  ] = useState<EntryCollection<IArticleFields> | null>(null);
  const [filteredArticles, setFilteredArticles] = useState<EntryCollection<IArticleFields> | null>(
    null
  );
  const [bookmarkedArticles, setBookmarkedArticles] = useState<string[]>(
    contextDefaultValues.bookmarkedArticles
  );
  const [activeSort, setActiveSort] = useState<string>('-sys.updatedAt');
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  useEffect(() => {
    client
      .getEntries<IArticleFields>({
        content_type: 'article',
        order: activeSort,
      })
      .then((response) => {
        setUnfilteredArticles(response);
        setFilteredArticles(response);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    async function getStoredArticles() {
      try {
        const value = await AsyncStorage.getItem('@MyStore:bookmarks');
        if (value !== null) {
          setBookmarkedArticles(JSON.parse(value));
        }
      } catch (e) {
        console.log(e);
      }
    }
    getStoredArticles();
  }, []);

  const updateBookmarkStore = async (updatedStore: string[]) => {
    try {
      await AsyncStorage.setItem('@MyStore:bookmarks', JSON.stringify(updatedStore));
    } catch (e) {
      console.log(e);
    }
  };

  const addBookmarkedArticle = (IdNewArticle: string) => {
    const value: string[] = bookmarkedArticles.concat(IdNewArticle);
    setBookmarkedArticles(value);
    updateBookmarkStore(value);
  };

  const deleteBookmarkedArticle = (IdDeleteArticle: string) => {
    const value: string[] = bookmarkedArticles.filter(
      (IdArticle: string) => IdArticle !== IdDeleteArticle
    );
    setBookmarkedArticles(value);
    updateBookmarkStore(value);
  };

  return (
    <GlobalStateContext.Provider
      value={{
        unfilteredArticles,
        filteredArticles,
        bookmarkedArticles,
        activeSort,
        activeFilter,
        setUnfilteredArticles,
        setFilteredArticles,
        addBookmarkedArticle,
        deleteBookmarkedArticle,
        setActiveSort,
        setActiveFilter,
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};

export default GlobalStateProvider;
