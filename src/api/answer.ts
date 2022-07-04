import axios from "axios";

export const getAnswer = async (answerId: number | undefined) => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/answers/${answerId}`,
  );

  return data;
};

export const postAnswer = async ({
  jwt,
  content,
  inquiry,
}: {
  jwt: string;
  content: string;
  inquiry: number;
}) => {
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/answers`,
    { data: { content, inquiry } },
    { headers: { Authorization: `Bearer ${jwt}` } },
  );

  return data;
};

export const updateAnswer = async ({
  jwt,
  content,
  answer,
}: {
  jwt: string;
  content: string;
  answer?: number;
}) => {
  const { data } = await axios.put(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/answers/${answer}`,
    { data: { content, answer } },
    { headers: { Authorization: `Bearer ${jwt}` } },
  );

  return data;
};

export const deleteAnswer = async ({
  jwt,
  answer,
}: {
  jwt: string;
  answer?: number;
}) => {
  const { data } = await axios.delete(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/answers/${answer}`,
    { headers: { Authorization: `Bearer ${jwt}` } },
  );

  return data;
};
