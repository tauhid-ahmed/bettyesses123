import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      role: "SUPER_ADMIN" | "ADMIN" | "USER";
      accountTypes: string[];
      profileImage?: string | null;
      emailVerified?: Date | null;
      accessToken: string;
      refreshToken: string;
    };
    accessToken: string;
    refreshToken: string;
  }

  interface User {
    id: string;
    email: string;
    name: string;
    emailVerified?: Date | null;
    image?: string | null;
    role: "SUPER_ADMIN" | "ADMIN" | "USER";
    accountTypes: string[];
    accessToken: string;
    refreshToken: string;
    profileImage?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken: string;
    refreshToken: string;
    user: {
      id: string;
      email: string;
      name: string;
      role: "SUPER_ADMIN" | "ADMIN" | "USER";
      accountTypes: string[];
      profileImage?: string | null;
    };
  }
}

declare module "@auth/core/adapters" {
  interface AdapterUser {
    role: "SUPER_ADMIN" | "ADMIN" | "USER";
    accountTypes: string[];
    accessToken: string;
    refreshToken: string;
    profileImage?: string | null;
  }
}
