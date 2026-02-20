import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import { UserProfile } from "./types/user-profile";

type Credentials = Partial<
  Record<"email" | "password" | "accessToken" | "refreshToken", unknown>
>;

export const authConfig: NextAuthConfig = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: Credentials) {
        if (!credentials) return null;

        // Handle token-based authentication (e.g., from OTP verification)
        if (credentials?.accessToken && credentials?.refreshToken) {
          try {
            const user = credentials as UserProfile & {
              accessToken: string;
              refreshToken: string;
            };

            // Check user status before allowing login
            if (user.status !== "ACTIVE") {
              throw new Error("ACCOUNT_NOT_ACTIVE");
            }

            if (!user.isVerified) {
              throw new Error("ACCOUNT_NOT_VERIFIED");
            }

            return {
              id: user.id,
              email: user.email,
              firstName: user.firstName,
              lastName: user.lastName,
              role: user.role,
              image: user.image,
              status: user.status,
              isVerified: user.isVerified,
              accessToken: user.accessToken,
              refreshToken: user.refreshToken,
            };
          } catch (error) {
            console.error("Token authorization error:", error);
            return null;
          }
        }

        // Handle email/password authentication
        if (credentials.email && credentials.password) {
          try {
            const res = await fetch(
              `${process.env.BACKEND_API_URL}/auth/login`,
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  email: credentials.email,
                  password: credentials.password,
                }),
              }
            );

            const response = await res.json();

            if (!res.ok || !response.success) {
              throw new Error(response.message || "LOGIN_FAILED");
            }

            const userData = response.data;

            // Check user status BEFORE creating session
            if (userData.status !== "ACTIVE") {
              throw new Error("ACCOUNT_NOT_ACTIVE");
            }

            if (!userData.isVerified) {
              throw new Error("ACCOUNT_NOT_VERIFIED");
            }

            return {
              id: userData.id,
              email: userData.email,
              firstName: userData.firstName,
              lastName: userData.lastName,
              role: userData.role,
              image: userData.image,
              status: userData.status,
              isVerified: userData.isVerified,
              accessToken: userData.accessToken,
              refreshToken: userData.refreshToken,
            };
          } catch (error) {
            console.error("Authorization error:", error);
            throw error;
          }
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.role = user.role;
        token.image = user.image;
        token.status = user.status;
        token.isVerified = user.isVerified;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
      }

      // Handle session updates
      if (trigger === "update" && session) {
        return { ...token, ...session.user };
      }

      return token;
    },
    async session({ session, token }) {
      // Send properties to the client
      if (token) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.firstName = token.firstName as string;
        session.user.lastName = token.lastName as string;
        session.user.role = token.role as "SUPERADMIN" | "ADMIN" | "USER";
        session.user.image = token.image as string | null;
        session.user.status = token.status as "ACTIVE" | "INACTIVE";
        session.user.isVerified = token.isVerified as boolean;
        session.user.accessToken = token.accessToken as string;
        session.user.refreshToken = token.refreshToken as string;
      }

      return session;
    },
  },
  pages: {
    signIn: "/login",
    signOut: "/",
    error: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  trustHost: true,
  secret: process.env.NEXTAUTH_SECRET,
};

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
