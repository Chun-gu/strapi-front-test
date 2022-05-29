import { IAddCommentValues, IIdArg } from "@types";
import axios from "axios";

export const getComments = async (id: IIdArg = "") => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/comments/${id}`
  );
  return data;
};

export const addComment = async (author: string, values: IAddCommentValues) => {
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/comments`,
    { data: { author, ...values } },
    {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjUzNjk1NjEyLCJleHAiOjE2NTYyODc2MTJ9.tbpu8lnRLMuh49x9wkSfG_i9LtYMYdPFaVbrR7N8WUc`,
      },
    }
  );
  return data;
};
