import SearchField from "@/features/table/components/SearchField";

type Props = {
  title: string;
  query: string;
  placeholder?: string | undefined;
};

export default function PageHeading({
  title,
  query = "",
  placeholder = "",
}: Props) {
  return (
    <div className="flex items-center justify-between print:hidden py-4">
      <h1 className="text-xl md:text-2xl lg:text-3xl font-medium">{title}</h1>
      <SearchField placeholder={placeholder} initialValue={query} />
    </div>
  );
}
