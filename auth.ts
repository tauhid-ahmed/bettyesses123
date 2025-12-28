import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import type {
  BackendAuthResponse,
  CredentialsLoginRequest,
} from "@/types/auth";

const BACKEND_URL = process.env.BACKEND_API_URL;

const authConfig: NextAuthConfig = {
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const loginData: CredentialsLoginRequest = {
            email: credentials.email as string,
            password: credentials.password as string,
          };

          const response = await fetch(`${BACKEND_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(loginData),
          });

          if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            return null;
          }

          const result: BackendAuthResponse = await response.json();

          if (!result.success || !result.data) {
            return null;
          }

          const { user, accessToken, refreshToken } = result.data;

          if (!user || !accessToken || !refreshToken) {
            return null;
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            emailVerified: null,
            image: user.profileImage ?? null,
            role: user.role,
            accountTypes: user.accountTypes || [],
            accessToken,
            refreshToken,
            profileImage: user.profileImage ?? null,
          };
        } catch (error) {
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.user = {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          profileImage: user.profileImage ?? null,
          accountTypes: user.accountTypes || [],
        };
      }

      return token;
    },

    async session({ session, token }) {
      if (token.user) {
        session.user = {
          id: token.user.id,
          email: token.user.email,
          name: token.user.name,
          role: token.user.role,
          profileImage: token.user.profileImage ?? null,
          accountTypes: token.user.accountTypes || [],
          emailVerified: null,
          accessToken: token.accessToken as string,
          refreshToken: token.refreshToken as string,
        };
        session.accessToken = token.accessToken;
        session.refreshToken = token.refreshToken;
      }

      return session;
    },

    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) {
        return `${baseUrl}${url}`;
      } else if (new URL(url).origin === baseUrl) {
        return url;
      }
      return baseUrl;
    },
  },

  pages: {
    signIn: "/login",
    error: "/login",
  },

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },

  trustHost: true,

  debug: true,
};

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
export const { GET, POST } = handlers;
