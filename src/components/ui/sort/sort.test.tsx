import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Sort from "./sort";
import { SortOption } from "../../../hooks/use-sort-and-filter";

const sortOptions: SortOption[] = [
  { value: "name", label: "Name" },
  { value: "date", label: "Date" },
];

const onSortChange = jest.fn();

describe("Sort Component", () => {
  test("renders Sort component", () => {
    render(
      <Sort
        sortOptions={sortOptions}
        selectedSortOptions=""
        onSortChange={onSortChange}
      />
    );

    expect(screen.getByText("No Filter")).toBeInTheDocument();
  });

  test("renders all sort options", () => {
    render(
      <Sort
        sortOptions={sortOptions}
        selectedSortOptions=""
        onSortChange={onSortChange}
      />
    );

    sortOptions.forEach((option) => {
      expect(screen.getByText(option.label)).toBeInTheDocument();
    });
  });

  test("calls onSortChange when an option is selected", () => {
    render(
      <Sort
        sortOptions={sortOptions}
        selectedSortOptions=""
        onSortChange={onSortChange}
      />
    );

    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "name" },
    });

    expect(onSortChange).toHaveBeenCalledWith("name");
  });
});
