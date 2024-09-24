import { useState, useMemo, useCallback } from "react";

export type SortOption = {
  label: string;
  value: string;
};

type UseSortAndFilterOptions<T> = {
  data: T[];
  sortOptions: SortOption[];
  initialSortBy?: string;
  filterFn: (item: T, searchTerm: string) => boolean;
};

export function useSortAndFilter<T>({
  data,
  sortOptions,
  initialSortBy,
  filterFn,
}: UseSortAndFilterOptions<T>) {
  const [sortBy, setSortBy] = useState(initialSortBy);
  const [searchTerm, setSearchTerm] = useState("");

  const sortedAndFilteredData = useMemo(() => {
    let result = [...data];

    if (searchTerm) {
      result = result.filter((item) => filterFn(item, searchTerm));
    }

    if (sortBy) {
      result.sort((a, b) => {
        const aValue = (a as any)[sortBy];
        const bValue = (b as any)[sortBy];
        if (aValue < bValue) return -1;
        if (aValue > bValue) return 1;
        return 0;
      });
    }

    return result;
  }, [data, sortBy, searchTerm, filterFn]);

  const handleSortChange = useCallback((newSortBy: string) => {
    setSortBy(newSortBy);
  }, []);

  const handleSearchChange = useCallback((newSearchTerm: string) => {
    setSearchTerm(newSearchTerm);
  }, []);

  return {
    sortedAndFilteredData,
    sortBy,
    searchTerm,
    sortOptions,
    handleSortChange,
    handleSearchChange,
  };
}
