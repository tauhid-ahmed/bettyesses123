import Navbar from "@/components/Navbar";
import Blob from "@/components/Blob";
import Footer from "@/components/Footer";

export default function MarketingLayout({ children }: React.PropsWithChildren) {
  return (
    <div className="min-h-svh flex flex-col relative bg-primary-100x">
      <BlobContainer />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

function BlobContainer() {
  return (
    <div className="absolute inset-0 overflow-hidden -z-10">
      <Blob variant="primary" size="lg" position="top-right" intent="strong" />
      <Blob
        variant="secondary"
        size="lg"
        position="center-left"
        intent="strong"
      />
      <Blob
        variant="primary"
        size="lg"
        position="bottom-right"
        intent="strong"
      />
    </div>
  );
}
