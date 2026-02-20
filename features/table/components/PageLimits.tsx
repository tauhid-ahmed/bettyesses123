import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";
import { DEFAULT_ITEMS_PER_PAGE } from "../utils/constant";

const pageLimits = ["5", "10", "15", "20", "50"];

type PageLimitsProps = {
  totalItems?: number;
};

export default function PageLimits({ totalItems }: PageLimitsProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentLimit =
    searchParams.get("limit") || DEFAULT_ITEMS_PER_PAGE.toString();

  const handlePageLimitChange = (limit: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("limit", limit);
    params.delete("page");
    params.set("page", "1"); // Reset to page 1 when limit changes
    const url = `?${params.toString()}`;
    router.push(url, { scroll: false });
  };

  return (
    <div className="flex items-center gap-2">
      <Select
        key={currentLimit}
        value={currentLimit}
        onValueChange={handlePageLimitChange}
      >
        <SelectTrigger className="text-sm">
          <SelectValue placeholder="Page Limit" />
        </SelectTrigger>
        <SelectContent>
          {pageLimits.map((limit) => (
            <SelectItem key={limit} value={limit}>
              {limit}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {totalItems !== undefined && (
        <span className="text-gray-400 text-sm">
          out of {totalItems.toLocaleString()}
        </span>
      )}
    </div>
  );
}
