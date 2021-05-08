import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useState, useEffect, FC } from 'react';
import { EntryCollection } from 'contentful';

import { IArticleFields } from './types/generated/contentful';
import { client } from './config/contentfulClient';

type Context = {
  articles: EntryCollection<IArticleFields> | null;
  setArticles: (articles: EntryCollection<IArticleFields> | null) => void;
  bookmarkedArticles: string[];
  addBookmarkedArticle: (id: string) => void;
  deleteBookmarkedArticle: (id: string) => void;
};

const contextDefaultValues: Context = {
  articles: null,
  setArticles: () => {},
  bookmarkedArticles: [],
  addBookmarkedArticle: () => {},
  deleteBookmarkedArticle: () => {},
};

export const GlobalStateContext = createContext<Context>(contextDefaultValues);

const GlobalStateProvider: FC = ({ children }) => {
  const [articles, setArticles] = useState<EntryCollection<IArticleFields> | null>(null);
  const [bookmarkedArticles, setBookmarkedArticles] = useState<string[]>(
    contextDefaultValues.bookmarkedArticles
  );

  useEffect(() => {
    client
      .getEntries<IArticleFields>({
        content_type: 'article',
      })
      .then((response) => {
        setArticles(response);
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

  const addBookmarkedArticle = (IDnewArticle: string) => {
    const value: string[] = bookmarkedArticles.concat(IDnewArticle);
    setBookmarkedArticles(value);
    updateBookmarkStore(value);
  };

  const deleteBookmarkedArticle = (IDdeleteArticle: string) => {
    const value: string[] = bookmarkedArticles.filter(
      (IDarticle: string) => IDarticle !== IDdeleteArticle
    );
    setBookmarkedArticles(value);
    updateBookmarkStore(value);
  };

  return (
    <GlobalStateContext.Provider
      value={{
        articles,
        setArticles,
        bookmarkedArticles,
        addBookmarkedArticle,
        deleteBookmarkedArticle,
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};

export default GlobalStateProvider;
