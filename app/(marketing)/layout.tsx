import Navbar from "@/components/Navbar";
import Blob from "@/components/Blob";
import Footer from "@/components/Footer";
import SmoothScroll from "@/providers/SmoothScroll";
import { CartProvider } from "@/features/cart/contexts/CartContext";

export default function MarketingLayout({ children }: React.PropsWithChildren) {
  return (
    <div className="min-h-svh flex flex-col relative bg-primary-100x">
      <BlobContainer />
      <CartProvider>
        <Navbar />
        <main className="flex-1">
          <SmoothScroll>{children}</SmoothScroll>
        </main>
      </CartProvider>
      <Footer />
    </div>
  );
}

function BlobContainer() {
  return (
    <div className="absolute inset-0 overflow-hidden -z-10">
      <Blob variant="primary" size="sm" position="top-left" intent="strong" />
      <Blob variant="primary" size="lg" position="top-right" intent="strong" />
      <Blob
        variant="primary"
        size="sm"
        position="center-right"
        intent="strong"
      />
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
      <Blob
        variant="tertiary"
        size="sm"
        position="bottom-left"
        intent="strong"
      />
    </div>
  );
}
