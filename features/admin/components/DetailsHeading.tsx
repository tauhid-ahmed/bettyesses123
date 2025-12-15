type Props = {
  title: string;
  description?: string;
};

export default function DetailsHeading({ title, description }: Props) {
  return (
    <div className="mb-6 md:mb-8 lg:mb-10 border-b-2 border-gray-300 pb-6">
      <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-900">
        {title}
      </h1>
      <p className="text-sm text-gray-500 mt-0.5">{description}</p>
    </div>
  );
}
