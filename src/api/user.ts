import axios from "axios";
import { IIdArg, IAddUserValues } from "@types";

export const getUsers = async (userId: IIdArg = "") => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/users/${userId}`,
  );
  return data;
};

export const addUser = async (values: IAddUserValues) => {
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/auth/local/register`,
    { ...values },
  );
  return data;
};

export const deleteUser = async (userId: string) => {
  const { data } = await axios.delete(
    `${process.env.NEXT_PUBLIC_API_URL}/api/users/${userId}`,
  );
  return data;
};

export const checkUsername = async (username: string) => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/username-existence/${username}`,
  );
  return data;
};
