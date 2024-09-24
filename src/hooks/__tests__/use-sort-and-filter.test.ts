import { renderHook, act } from "@testing-library/react";
import { useSortAndFilter, SortOption } from "../use-sort-and-filter";

type Item = {
  id: number;
  name: string;
  age: number;
};

const data: Item[] = [
  { id: 1, name: "Alice", age: 30 },
  { id: 2, name: "Bob", age: 25 },
  { id: 3, name: "Charlie", age: 35 },
];

const sortOptions: SortOption[] = [
  { label: "Name", value: "name" },
  { label: "Age", value: "age" },
];

const filterFn = (item: Item, searchTerm: string) =>
  item.name.toLowerCase().includes(searchTerm.toLowerCase());

describe("useSortAndFilter", () => {
  it("should initialize with default values", () => {
    const { result } = renderHook(() =>
      useSortAndFilter({ data, sortOptions, filterFn })
    );

    expect(result.current.sortedAndFilteredData).toEqual(data);
    expect(result.current.sortBy).toBeUndefined();
    expect(result.current.searchTerm).toBe("");
  });

  it("should sort data by initialSortBy", () => {
    const { result } = renderHook(() =>
      useSortAndFilter({ data, sortOptions, initialSortBy: "age", filterFn })
    );

    expect(result.current.sortedAndFilteredData).toEqual([
      { id: 2, name: "Bob", age: 25 },
      { id: 1, name: "Alice", age: 30 },
      { id: 3, name: "Charlie", age: 35 },
    ]);
  });

  it("should filter data by searchTerm", () => {
    const { result } = renderHook(() =>
      useSortAndFilter({ data, sortOptions, filterFn })
    );

    act(() => {
      result.current.handleSearchChange("bo");
    });

    expect(result.current.sortedAndFilteredData).toEqual([
      { id: 2, name: "Bob", age: 25 },
    ]);
  });

  it("should sort and filter data", () => {
    const { result } = renderHook(() =>
      useSortAndFilter({ data, sortOptions, initialSortBy: "name", filterFn })
    );

    act(() => {
      result.current.handleSearchChange("a");
    });

    expect(result.current.sortedAndFilteredData).toEqual([
      { id: 1, name: "Alice", age: 30 },
      { id: 3, name: "Charlie", age: 35 },
    ]);
  });

  it("should change sort option", () => {
    const { result } = renderHook(() =>
      useSortAndFilter({ data, sortOptions, initialSortBy: "name", filterFn })
    );

    act(() => {
      result.current.handleSortChange("age");
    });

    expect(result.current.sortedAndFilteredData).toEqual([
      { id: 2, name: "Bob", age: 25 },
      { id: 1, name: "Alice", age: 30 },
      { id: 3, name: "Charlie", age: 35 },
    ]);
  });
});
