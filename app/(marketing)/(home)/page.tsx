import Blob from "@/components/Blob";

export default function page() {
  return (
    <div className="h-[600vh] relative bg-gray-50">
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
      <h1 className="primary-gradient-text text-3xl inline-block">
        Give a thoughtful Gift <br /> to a child you love 🎁
      </h1>
      <div className="size-96 bg-primary-500"></div>
      <div className="size-96 bg-secondary-400"></div>
    </div>
  );
}
