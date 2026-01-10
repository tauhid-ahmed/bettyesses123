import { getLegalPages } from "@/features/admin/legal/actions/get-legal-pages";
import PolicyPage from "../policy/page";

export default async function TermsConditionPage() {
  const { data } = await getLegalPages("terms");
  return <PolicyPage title="Terms & Condition" type="terms" initialData={data || []} />;
}
