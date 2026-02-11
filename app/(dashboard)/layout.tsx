import { auth } from "@/auth";
import { signinPath } from "@/paths";
import { redirect } from "next/navigation";

export default async function layout({ children }: React.PropsWithChildren) {
  const session = await auth();

  if (!session) {
    redirect(signinPath());
  }

  if (session && session.user.role !== "SUPERADMIN") {
    redirect(signinPath());
  }

  return children;
}
