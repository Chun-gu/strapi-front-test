import axios from "axios";
import { nanoid } from "nanoid";
import { IAddProductValues } from "@types";

export const getProducts = async (
  productId: string | string[] | undefined = ""
) => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/products/${productId}`
  );
  return data;
};

export const addProduct = async (values: IAddProductValues) => {
  const productId = `product-${nanoid()}`;
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/products`,
    { data: { productId, ...values } }
  );
  return data;
};

export const deleteProduct = async (productId: string) => {
  const { data } = await axios.delete(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/products/${productId}`
  );
  return data;
};
