import axios from "axios";
import { IAddProductValues, IIdArg } from "src/types";

export const getProducts = async (id: IIdArg = "") => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/products/${id}?populate=*`
  );
  return data;
};

export const addProduct = async (values: IAddProductValues) => {
  const formData = new FormData();
  const { images, ...rest } = values;
  formData.append("files.images", images[0]);
  formData.append("data", JSON.stringify(rest));
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/products`,
    formData,
    {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjUzNjk1NjEyLCJleHAiOjE2NTYyODc2MTJ9.tbpu8lnRLMuh49x9wkSfG_i9LtYMYdPFaVbrR7N8WUc`,
      },
    }
  );
  return data;
};

export const deleteProduct = async (productId: string) => {
  const { data } = await axios.delete(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/products/${productId}`
  );
  return data;
};
