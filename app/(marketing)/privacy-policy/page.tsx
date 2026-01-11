import Link from "next/link";
import HowWeWorks from "@/features/how-we-works/components/HowWeWorks";
import Intro from "./_components/Intro";
import Terms from "./_components/Terms";
import { getPublicLegalPages } from "@/features/legal/actions/get-public-legal-pages";

export const dynamic = "force-dynamic";

export default async function TermsAndConditionPage() {
  const result = await getPublicLegalPages("privacy");
  const policies = result.success ? result.data : [];

  return (
    <>
      <Intro />
      <Terms data={policies} />
      <HowWeWorks />
    </>
  );
}
