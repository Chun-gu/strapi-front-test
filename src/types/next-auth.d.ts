import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";
import { IUser } from "@types";

declare module "next-auth" {
  interface Session {
    user?: IUser;
    jwt?: string;
  }

  interface User {
    user?: IUser;
    jwt?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user?: IUser;
    jwt?: string;
  }
}
