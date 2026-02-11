import HowWeWorks from "@/features/how-we-works/components/HowWeWorks";
import { getPublicLegalPages } from "@/features/legal/actions/get-public-legal-pages";
import LegalIntro from "@/features/legal/components/LegalIntro";
import Terms from "@/features/legal/components/Terms";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Betty Esses",
  description: "Privacy Policy you need to know for using Betty Esses.",
};

export const dynamic = "force-dynamic";

export default async function PrivacyPolicyPage() {
  const result = await getPublicLegalPages("privacy");
  const policies = result.success ? result.data : [];

  return (
    <>
      <LegalIntro
        title="Privacy Policy"
        description="Privacy Policy you need to know for using this website."
      />
      <Terms data={policies} />
      <HowWeWorks />
    </>
  );
}
