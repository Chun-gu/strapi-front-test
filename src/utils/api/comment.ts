import axios from "axios";
import { IAddCommentValues } from "@types";

export const getComments = async (id: number) => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/review-comments/${id}`,
  );

  return data;
};

export const addComment = async ({
  jwt,
  author,
  content,
  review,
}: IAddCommentValues) => {
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/comments`,
    { data: { author, content, review } },
    { headers: { Authorization: `Bearer ${jwt}` } },
  );

  return data;
};
