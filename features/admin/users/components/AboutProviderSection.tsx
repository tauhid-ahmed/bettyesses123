type AboutProviderSectionProps = {
  text: string;
};

export function AboutProviderSection({ text }: AboutProviderSectionProps) {
  return (
    <div className="border-b border-gray-200 pb-6">
      <div className="grid md:grid-cols-[180px_1fr] gap-x-6 md:gap-y-4 gap-y-2">
        <label className="text-sm font-medium text-gray-700">
          About Provider:
        </label>
        <div className="text-sm text-gray-900 bg-white border border-gray-200 rounded px-3 py-2 leading-relaxed">
          {text}
        </div>
      </div>
    </div>
  );
}
