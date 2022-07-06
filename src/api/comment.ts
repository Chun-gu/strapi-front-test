import axios from "axios";
import { IAddCommentValues, IUpdateCommentValues } from "@types";

export const getComments = async (id: number, limit: number, page: number) => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/review-comments/${id}?limit=${limit}&page=${page}`,
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

export const updateComment = async ({
  jwt,
  author,
  content,
  review,
  comment,
}: IUpdateCommentValues) => {
  const { data } = await axios.put(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/comments/${comment}`,
    { data: { author, content, review } },
    { headers: { Authorization: `Bearer ${jwt}` } },
  );

  return data;
};

export const deleteComment = async ({
  comment,
  jwt,
}: {
  comment: number;
  jwt: string;
}) => {
  const { data } = await axios.delete(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/comments/${comment}`,
    {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    },
  );

  return data;
};
