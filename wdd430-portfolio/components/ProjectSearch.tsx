'use client';

import { Suspense } from 'react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

function SearchInput() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="mb-6 max-w-md">
      <input
        type="search"
        placeholder="Search projects..."
        defaultValue={searchParams.get('query')?.toString()}
        onChange={(e) => handleSearch(e.target.value)}
        className="w-full rounded-lg border border-gray-300 p-3 text-gray-900 bg-white placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
      />
    </div>
  );
}

// The actual export wraps the input in Suspense
export default function ProjectSearch() {
  return (
    <Suspense fallback={<div className="h-12 w-full max-w-md bg-gray-200 animate-pulse rounded-lg mb-6"></div>}>
      <SearchInput />
    </Suspense>
  );
}