import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SearchAndSort from "./SearchAndSort";
import exp from "constants";

describe("SearchAndSort Component", () => {
  const mockOnSearchChange = jest.fn();
  const mockOnSortChange = jest.fn();

  const defaultProps = {
    searchTerm: "",
    onSearchChange: mockOnSearchChange,
    selectedSortOptions: [],
    onSortChange: mockOnSortChange,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders search input and sort options", () => {
    render(<SearchAndSort {...defaultProps} />);

    expect(screen.getByPlaceholderText("Search by name")).toBeInTheDocument();
    expect(screen.getByText("Alphabetical")).toBeInTheDocument();
    expect(screen.getByText("Rating")).toBeInTheDocument();
  });

  test("calls onSearchChange when search input changes", () => {
    render(<SearchAndSort {...defaultProps} />);

    const searchInput = screen.getByPlaceholderText("Search by name");
    fireEvent.change(searchInput, { target: { value: "test" } });

    expect(mockOnSearchChange).toHaveBeenCalledWith("test");
  });

  test("calls onSortChange when sort option changes", () => {
    render(<SearchAndSort {...defaultProps} />);

    const alphabeticalCheckbox = screen.getAllByLabelText("Alphabetical")[0];
    console.log(alphabeticalCheckbox);
    fireEvent.click(alphabeticalCheckbox);

    expect(mockOnSortChange).toHaveBeenCalledWith("alphabetical");
  });

  test("checks the correct sort options based on selectedSortOptions prop", () => {
    const propsWithSelectedOptions = {
      ...defaultProps,
      selectedSortOptions: ["alphabetical"],
    };

    render(<SearchAndSort {...propsWithSelectedOptions} />);

    expect(screen.getByLabelText("Alphabetical")).toBeChecked();
    expect(screen.getByLabelText("Rating")).not.toBeChecked();
  });

  test("calls onSortChange when sort option is unchecked", () => {
    const propsWithSelectedOptions = {
      ...defaultProps,
      selectedSortOptions: ["alphabetical"],
    };

    render(<SearchAndSort {...propsWithSelectedOptions} />);

    const alphabeticalCheckbox = screen.getByLabelText("Alphabetical");
    fireEvent.click(alphabeticalCheckbox);

    expect(mockOnSortChange).toHaveBeenCalledWith("alphabetical");
  });
});
