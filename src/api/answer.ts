import axios from "axios";

export const getAnswer = async (answerId: number | undefined) => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/answers/${answerId}`,
  );

  return data;
};

export const addAnswer = async ({
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
