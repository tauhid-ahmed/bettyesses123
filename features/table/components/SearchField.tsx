"use client";

import { useState, useEffect, useTransition, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { LucideLoader, LucideSearch } from "lucide-react";

interface SearchFieldProps {
  placeholder?: string;
  initialValue?: string;
  debounceTime?: number;
}

export default function SearchField({
  initialValue,
  debounceTime = 50,
  placeholder,
}: SearchFieldProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  // Get current query from URL (check both 'q' and 'searchTerm')
  const urlQuery = searchParams.get("q") || searchParams.get("searchTerm") || "";
  const [query, setQuery] = useState(() => initialValue || urlQuery);
  const [isPending, startTransition] = useTransition();
  const isInternalUpdateRef = useRef(false);
  const prevUrlQueryRef = useRef(urlQuery);

  // Sync with URL when it changes externally (not from our own updates)
  // Use a callback to avoid synchronous setState in effect
  useEffect(() => {
    const syncFromUrl = () => {
      // Only sync if URL changed externally and it's different from current query
      if (
        urlQuery !== prevUrlQueryRef.current &&
        urlQuery !== query &&
        !isInternalUpdateRef.current
      ) {
        startTransition(() => {
          setQuery(urlQuery);
        });
      }
      prevUrlQueryRef.current = urlQuery;
      isInternalUpdateRef.current = false;
    };
    
    // Use requestAnimationFrame to defer the state update
    const rafId = requestAnimationFrame(syncFromUrl);
    return () => cancelAnimationFrame(rafId);
  }, [urlQuery, query, startTransition]);

  useEffect(() => {
    // Don't update if query matches current URL
    const currentUrlQuery = searchParams.get("q") || searchParams.get("searchTerm") || "";
    if (query === currentUrlQuery) {
      return;
    }

    const handler = setTimeout(() => {
      isInternalUpdateRef.current = true;
      const params = new URLSearchParams(searchParams.toString());

      if (query) {
        params.set("q", query);
        params.set("searchTerm", query);
      } else {
        params.delete("q");
        params.delete("searchTerm");
      }

      startTransition(() => {
        router.push(`?${params.toString()}`);
      });
    }, debounceTime);

    return () => clearTimeout(handler);
  }, [query, debounceTime, router, searchParams]);

  return (
    <div className="inline-flex items-center border border-primary-100 gap-1  overflow-hidden focus-within:border-primary-500 rounded-full bg-white shadow-xs h-10">
      <div className="size-7 inline-flex items-center justify-center ml-1">
        {isPending ? (
          <LucideLoader size={14} className="animate-spin" />
        ) : (
          <LucideSearch size={14} />
        )}
      </div>
      <input
        type="text"
        placeholder={placeholder ? placeholder : "Search..."}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border-none bg-transparent outline-none placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 w-52 text-gray-950 text-sm"
      />
    </div>
  );
}
