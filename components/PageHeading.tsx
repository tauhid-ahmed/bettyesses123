import SearchField from "@/features/table/components/SearchField";

type Props = {
  title: string;
  query: string;
  placeholder?: string | undefined;
  showSearchBar?: boolean;
};

export default function PageHeading({
  title,
  query = "",
  placeholder = "",
  showSearchBar = true,
}: Props) {
  return (
    <div className="flex items-center justify-between print:hidden pt-4">
      <h1 className="text-xl md:text-2xl lg:text-[32px] font-medium text-[#000407]">
        {title}
      </h1>
      {showSearchBar && (
        <SearchField placeholder={placeholder} initialValue={query} />
      )}
    </div>
  );
}
