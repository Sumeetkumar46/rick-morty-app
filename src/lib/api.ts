import axios from 'axios';

export const fetchCharacters = async (page: number = 1) => {
  const res = await axios.get(`https://rickandmortyapi.com/api/character?page=${page}`);
  return res.data;
};

export const fetchCharacterById = async (id: number) => {
  const res = await axios.get(`https://rickandmortyapi.com/api/character/${id}`);
  return res.data;
};
