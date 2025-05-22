import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const DataContext = createContext({});

export function DataProvider({ children }) {
  const location = useLocation();
  const API_URL =
    'https://rickandmortyapi.com/api/character/' + location.search;
  const [activePage, setActivePage] = useState(1);
  const [pages, setPages] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [isError, setIsError] = useState(false);
  const [info, setInfo] = useState({});

  useEffect(() => {
    if (!info.pages) return;
    const createdPages = Array.from({ length: info.pages }, (_, i) => i + 1);
    setPages(createdPages);
  }, [info]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const pageFromParams = parseInt(params.get('page'), 10);
    setActivePage(!isNaN(pageFromParams) ? pageFromParams : 1);
  }, [location.search]);

  useEffect(() => {
    const fetchData = async (url) => {
      setIsFetching(true);
      setIsError(false);
      try {
        const { data } = await axios.get(url);
        setCharacters(data.results);
        setInfo(data.info);
      } catch (e) {
        setIsError(true);
        console.error(e);
      } finally {
        setIsFetching(false);
      }
    };

    fetchData(API_URL);
  }, [API_URL]);

  return (
    <DataContext.Provider
      value={{
        activePage,
        setActivePage,
        characters,
        isFetching,
        isError,
        info,
        pages
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => useContext(DataContext);
