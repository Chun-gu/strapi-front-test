import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

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
      if (user) {
        token.jwt = user.jwt;
        token.user = user.user;
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.jwt = token.jwt;
        session.user = token.user;
      }
      return session;
    },

    // async redirect({ url, baseUrl }) {
    //   console.log("url", url, "baseUrl", baseUrl);
    //   // Allows relative callback URLs
    //   if (url.startsWith("/")) return `${baseUrl}${url}`;
    //   // Allows callback URLs on the same origin
    //   else if (new URL(url).origin === baseUrl) return url;
    //   return baseUrl;
    // },
  },

  pages: {
    signIn: "/login",
  },
});
