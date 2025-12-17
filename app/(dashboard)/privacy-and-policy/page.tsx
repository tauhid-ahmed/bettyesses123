import PageHeading from "@/components/PageHeading";
import EditPrivacyPolicy from "@/components/privacy-and-policy/EditPrivacyPolicy";

const PrivacyAndPolicyPage = () => {
  return (
    <div>
      <div>
        <PageHeading
          query=""
          title="Add New Privacy Policy"
          showSearchBar={false}
        />
      </div>

      <div>
        <EditPrivacyPolicy />
      </div>
    </div>
  );
};

export default PrivacyAndPolicyPage;
