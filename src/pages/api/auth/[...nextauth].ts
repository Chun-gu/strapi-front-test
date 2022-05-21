import axios from "axios";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "이메일 혹은 아이디로 로그인",
      credentials: {
        email: {
          label: "Email",
          type: "text",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(
        credentials: Record<"email" | "password", string> | undefined
      ) {
        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/auth/local`,
          {
            identifier: credentials?.email,
            password: credentials?.password,
          }
        );
        console.log("로그인 결과 정보", data);
        if (data) return data;
        else return null;
        // const { email, password } = credentials as {
        //   email: string;
        //   password: string;
        // };
        // console.log("아이디, 비밀번호 입력", email, password);
        // const {
        //   data: {
        //     data: { id, nickname, isAdmin },
        //   },
        // } = await axios.post(`${process.env.NEXTAUTH_URL}/api/login`, {
        //   email,
        //   password,
        // });
        // console.log("id, nickname, isAdmin", id, nickname, isAdmin);
        // if (id) {
        //   return { id, nickname, isAdmin };
        // }
        // throw new Error("로그인 실패");
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
