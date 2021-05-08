import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useState, useEffect, FC } from 'react';

type Context = {
  bookmarkedArticles: string[];
  addBookmarkedArticle: (id: string) => void;
  deleteBookmarkedArticle: (id: string) => void;
};

const contextDefaultValues: Context = {
  bookmarkedArticles: [],
  addBookmarkedArticle: () => {},
  deleteBookmarkedArticle: () => {},
};

export const BookmarkContext = createContext<Context>(contextDefaultValues);

const BookmarkProvider: FC = ({ children }) => {
  const [bookmarkedArticles, setBookmarkedArticles] = useState<string[]>(
    contextDefaultValues.bookmarkedArticles
  );

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
    <BookmarkContext.Provider
      value={{
        bookmarkedArticles,
        addBookmarkedArticle,
        deleteBookmarkedArticle,
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
};

export default BookmarkProvider;
