import Container from "@/components/Container";
import AuthContainer from "@/features/auth/components/AuthContainer";
import { Suspense } from "react";

export default function AuthLayout({ children }: React.PropsWithChildren) {
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
