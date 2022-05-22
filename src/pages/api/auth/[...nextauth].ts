import { IUser } from "@types";
import axios from "axios";
import NextAuth, { Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

interface ICustomSession extends Session {
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
  jwt: string;
  user: IUser;
}
interface ICustomJWT extends JWT {
  user: {
    jwt: string;
    user: IUser;
  };
}

export default NextAuth({
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "이메일 혹은 아이디로 로그인",
      credentials: {
        username: {
          label: "username",
          type: "text",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(
        credentials: Record<"username" | "password", string> | undefined
      ) {
        try {
          const { data } = await axios.post(
            `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/auth/local`,
            {
              identifier: credentials?.username,
              password: credentials?.password,
            }
          );
          console.log("로그인 결과", data);
          if (data) {
            return data;
          } else {
            return null;
          }
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      console.log("jwt의 user", user);
      console.log("jwt의 token", token);
      if (user) {
        return {
          ...token,
          user,
        };
      }
      return token;
    },
    async session({ session, token }): Promise<Session | ICustomSession> {
      if (token) {
        return {
          ...session,
          jwt: (token as ICustomJWT).user.jwt,
          user: (token as ICustomJWT).user.user,
        };
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});
