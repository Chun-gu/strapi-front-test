import axios from 'axios';

export const getProducts = async () => {
  const { data } = await axios.get("http://localhost:1337/api/products");
  return data;
};
export const addProduct = async () => {
  const { data } = await axios.get("http://localhost:1337/api/products");
  return data;
};
export const deleteProduct = async () => {
  const { data } = await axios.get("http://localhost:1337/api/products");
  return data;
};