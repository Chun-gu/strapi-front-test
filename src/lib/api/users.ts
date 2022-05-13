import axios from 'axios';

export const getUsers = async () => {
  const { data } = await axios.get("http://localhost:1337/api/products");
  return data;
};
export const addUser = async () => {
  const { data } = await axios.get("http://localhost:1337/api/products");
  return data;
};
export const deleteUser = async () => {
  const { data } = await axios.get("http://localhost:1337/api/products");
  return data;
};