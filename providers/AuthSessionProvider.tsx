"use client";

import { SessionProvider } from "next-auth/react";
import type { ReactNode } from "react";
import type { Session } from "next-auth";

interface ProvidersProps {
  children: ReactNode;
  session?: Session | null;
}

export default function AuthSession({ children, session }: ProvidersProps) {
  return (
    <SessionProvider session={session} refetchInterval={0}>
      {children}
    </SessionProvider>
  );
}
