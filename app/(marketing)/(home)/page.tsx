import Blob from "@/components/Blob";

export default function page() {
  return (
    <div className="h-[300vh] relative bg-white">
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
