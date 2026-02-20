import HowWeWorks from "@/features/how-we-works/components/HowWeWorks";
import { getPublicLegalPages } from "@/features/legal/actions/get-public-legal-pages";
import LegalIntro from "@/features/legal/components/LegalIntro";
import Terms from "@/features/legal/components/Terms";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and Conditions | Betty Esses",
  description: "Terms and Conditions you need to know for using Betty Esses.",
};

export const dynamic = "force-dynamic";

export default async function TermsAndConditionsPage() {
  const result = await getPublicLegalPages("terms");
  const terms = result.success ? result.data : [];

  return (
    <>
      <LegalIntro
        title="Terms & Conditions"
        description="Terms & Condition you need to know for using this website."
      />
      <Terms data={terms} />
      <HowWeWorks />
    </>
  );
}
