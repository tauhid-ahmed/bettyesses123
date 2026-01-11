import HowWeWorks from "@/features/how-we-works/components/HowWeWorks";
import Intro from "../terms-and-condition/_components/Intro";
import Terms from "../terms-and-condition/_components/Terms";
import { getPublicLegalPages } from "@/features/legal/actions/get-public-legal-pages";

export const dynamic = "force-dynamic";

export default async function TermsAndConditionPage() {
  const result = await getPublicLegalPages("terms");
  const terms = result.success ? result.data : [];

  return (
    <>
      <Intro />
      <Terms data={terms} />
      <HowWeWorks />
    </>
  );
}
