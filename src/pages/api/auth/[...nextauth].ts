import { NextApiRequest } from "next";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { signIn } from "next-auth/react";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "이메일 혹은 아이디로 로그인",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "이메일이나 아이디",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "비밀번호",
        },
      },
      async authorize(credentials: Record<any, any>, req: NextApiRequest) {
        return credentials;
      },
    }),
  ],
  callbacks: {
    session: async ({ session, token }) => {
      session.id = token.id;
      session.jwt = token.jwt;
      return Promise.resolve(session);
    },
    jwt: async ({ token, user }) => {
      const isSignIn = user ? true : false;
      if (isSignIn && user) {
        token.id = user.id;
        token.jwt = user.jwt;
      }
      return Promise.resolve(token);
    },
  },
  pages: {
    signIn: "/login",
  },
});
