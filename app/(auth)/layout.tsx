import Container from "@/components/Container";
import AuthContainer from "@/features/auth/components/AuthContainer";
import { Suspense } from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: React.PropsWithChildren) {
  const session = await auth();

  if (session) {
    redirect("/");
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <Container>
        <Suspense fallback={<div>Loading...</div>}>
          <AuthContainer>{children}</AuthContainer>
        </Suspense>
      </Container>
    </div>
  );
}
