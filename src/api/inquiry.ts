import axios from "axios";
import { IAddInquiryValues, IUpdateInquiryValues } from "@types";

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

export const addInquiry = async ({
  jwt,
  author,
  product,
  content,
}: IAddInquiryValues) => {
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/inquiries`,
    { data: { product, author, content } },
    { headers: { Authorization: `Bearer ${jwt}` } },
  );

  return data;
};

export const updateInquiry = async ({
  jwt,
  author,
  inquiry,
  content,
}: IUpdateInquiryValues) => {
  const { data } = await axios.put(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/inquiries/${inquiry}`,
    { data: { inquiry, author, content } },
    { headers: { Authorization: `Bearer ${jwt}` } },
  );

  return data;
};

export const deleteInquiry = async ({
  inquiry,
  jwt,
}: {
  inquiry: number;
  jwt: string;
}) => {
  const { data } = await axios.delete(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/inquiries/${inquiry}`,
    {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    },
  );

  return data;
};
