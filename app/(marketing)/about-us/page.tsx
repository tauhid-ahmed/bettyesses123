import HowWeWorks from "@/features/how-we-works/components/HowWeWorks";
import Intro from "./_components/Intro";
import AboutUs from "./_components/AboutUs";
import PrivacyFeatures from "@/features/privacy-features/components/PrivacyFeatures";
import HappyClients from "./_components/HappyClients";

export default function AboutUsPage() {
  return (
    <>
      <Intro />
      <AboutUs />
      <HowWeWorks />
      <HappyClients />
      <PrivacyFeatures />
    </>
  );
}
