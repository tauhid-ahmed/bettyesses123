// types/next-auth.d.ts
import { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      firstName: string;
      lastName: string;
      role: "SUPERADMIN" | "ADMIN" | "USER";
      image: string | null;
      status: "ACTIVE" | "INACTIVE";
      isVerified: boolean;
      accessToken: string;
      refreshToken: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: "SUPERADMIN" | "ADMIN" | "USER";
    image: string | null;
    status: "ACTIVE" | "INACTIVE";
    isVerified: boolean;
    accessToken: string;
    refreshToken: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: "SUPERADMIN" | "ADMIN" | "USER";
    image: string | null;
    status: "ACTIVE" | "INACTIVE";
    isVerified: boolean;
    accessToken: string;
    refreshToken: string;
  }
}
