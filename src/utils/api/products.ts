import axios from "axios";
import { IAddProductValues, IIdArg } from "@types";

export const getProducts = async ({ pageParam = 1 }) => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/products?page=${pageParam}`,
  );

  return data;
};

export const getProduct = async (productId: IIdArg) => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/products/${productId}`,
  );

  return data;
};

export const addProduct = async (values: IAddProductValues) => {
  const { images, jwt, ...rest } = values;
  const formData = new FormData();
  formData.append("files.images", images[0]);
  formData.append("data", JSON.stringify(rest));

  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/products`,
    formData,
    {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `Bearer ${jwt}`,
      },
    },
  );

  return data;
};

export const deleteProduct = async (productId: string) => {
  const { data } = await axios.delete(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/products/${productId}`,
  );

  return data;
};
