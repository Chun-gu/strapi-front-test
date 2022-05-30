import { IAddCommentValues, IIdArg } from "@types";
import axios from "axios";

export const getComments = async (id: IIdArg = "") => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/comments/${id}`
  );
  return data;
};

export const addComment = async (
  jwt: string,
  author: number,
  values: IAddCommentValues
) => {
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/comments`,
    { data: { author, ...values } },
    {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }
  );
  return data;
};
