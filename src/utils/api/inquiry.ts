import axios from "axios";
import { IAddInquiryValues } from "@types";

export const getInquiries = async (
  productId: number | string | string[] | undefined,
  limit = 5,
  page = 1,
) => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/product-inquiries/${productId}?limit=${limit}&page=${page}`,
  );

  return data;
};

export const addInquiry = async (
  jwt: string,
  author: number,
  values: IAddInquiryValues,
) => {
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/inquiries`,
    { data: { author, ...values } },
    { headers: { Authorization: `Bearer ${jwt}` } },
  );

  return data;
};

// export const updateInquiry = async () => {return data};
