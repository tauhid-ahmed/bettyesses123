import { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";

// API Response Types
export interface LoginResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: UserData;
}

export interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: "SUPERADMIN" | "ADMIN" | "USER";
  image: string | null;
  status: "ACTIVE" | "INACTIVE";
  isVerified: boolean;
  accessToken: string;
  refreshToken: string;
}

// Extend Next-Auth types
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

  interface User extends DefaultUser {
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
  interface JWT extends DefaultJWT {
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
