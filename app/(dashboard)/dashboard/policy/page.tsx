import PageHeading from "@/components/PageHeading";

import { PolicyType } from "../privacy-and-policy/policy";
import EditPrivacyPolicy from "./editprivacypolicy";

interface PolicyPageProps {
  title: string;
  type: PolicyType;
}

const PolicyPage = ({ title, type }: PolicyPageProps) => {
  return (
    <>
      <PageHeading title={`Add New ${title}`} showSearchBar={false} query="" />
      <EditPrivacyPolicy type={type} />
    </>
  );
};

export default PolicyPage;
