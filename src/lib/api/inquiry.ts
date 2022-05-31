import { IAddAnswerValues, IAddInquiryValues } from "@types";
import axios from "axios";

export const addInquiry = async (
  jwt: string,
  author: number,
  values: IAddInquiryValues
) => {
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/inquiries`,
    { data: { author, ...values } },
    { headers: { Authorization: `Bearer ${jwt}` } }
  );

  return data;
};

export const addAnswer = async (
  jwt: string,
  inquiryId: string,
  values: string
) => {
  const { data } = await axios.put(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/inquiries/${inquiryId}`,
    { data: { answer: values } },
    { headers: { Authorization: `Bearer ${jwt}` } }
  );

  return data;
};
