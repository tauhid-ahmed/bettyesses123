import { getLegalPages } from "@/features/admin/legal/actions/get-legal-pages";
import PolicyPage from "../policy/page";

export default async function PrivacyPolicyPage() {
  const { data } = await getLegalPages("privacy");
  return <PolicyPage title="Privacy Policy" type="privacy" initialData={data || []} />;
}
