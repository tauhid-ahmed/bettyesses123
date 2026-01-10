import PageHeading from "@/components/PageHeading";

import { LegalPage } from "@/features/admin/legal/types";
import { PolicyType } from "../privacy-and-policy/policy";
import EditPrivacyPolicy from "./editprivacypolicy";

interface PolicyPageProps {
  title: string;
  type: PolicyType;
  initialData: LegalPage[];
}

const PolicyPage = ({ title, type, initialData }: PolicyPageProps) => {
  return (
    <>
      <PageHeading title={`Add New ${title}`} showSearchBar={false} query="" />
      <EditPrivacyPolicy type={type} initialPolicies={initialData} />
    </>
  );
};

export default PolicyPage;
