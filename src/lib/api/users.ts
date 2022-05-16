import axios from "axios";
import { IRegisterUserValues } from "@types";

export const getUsers = async () => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/users`
  );
  return data;
};

export const addUser = async (values: IRegisterUserValues) => {
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/api/auth/local/register`,
    values
  );
  return data;
};

export const deleteUser = async () => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/auth/local/register`
  );
  return data;
};
