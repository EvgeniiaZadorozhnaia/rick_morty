import axios from 'axios';
import { useEffect, useRef, useState } from 'react';

let cache = null;

async function fetchAllCharacters() {
  if (cache) {
    return cache;
  }

  const baseURL = 'https://rickandmortyapi.com/api/character/';
  try {
    let allCharacters = [];

    const firstResponse = await axios.get(baseURL);
    const { results, info } = firstResponse.data;
    allCharacters = results;
    const pages = info.pages;

    const requests = [];
    for (let i = 2; i <= pages; i++) {
      requests.push(axios.get(`${baseURL}?page=${i}`));
    }

    const responses = await Promise.all(requests);
    responses.forEach((res) => {
      allCharacters = allCharacters.concat(res.data.results);
    });

    const unique = (key) => [
      ...new Set(allCharacters.map((item) => item[key]))
    ];

    cache = {
      status: unique('status'),
      gender: unique('gender'),
      species: unique('species')
    };

    return cache;
  } catch (error) {
    console.error(error);
  }
}

export function useFilterOptions() {
  const [options, setOptions] = useState({
    status: [],
    gender: [],
    species: []
  });

  const loadedRef = useRef(false);

  useEffect(() => {
    if (loadedRef.current) {
      return;
    }
    loadedRef.current = true;

    const fetchOptions = async () => {
      try {
        const data = await fetchAllCharacters();
        setOptions(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchOptions();
  }, []);

  return options;
}
