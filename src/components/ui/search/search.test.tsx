import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Search from "./search";

describe("Search Component", () => {
  const mockOnSearchChange = jest.fn();

  beforeEach(() => {
    mockOnSearchChange.mockClear();
  });

  test("renders the search input with the correct placeholder", () => {
    render(<Search searchTerm="" onSearchChange={mockOnSearchChange} />);
    const inputElement = screen.getByPlaceholderText(/search by name/i);
    expect(inputElement).toBeInTheDocument();
  });

  test("renders the search input with the correct value", () => {
    render(<Search searchTerm="test" onSearchChange={mockOnSearchChange} />);
    const inputElement = screen.getByDisplayValue(/test/i);
    expect(inputElement).toBeInTheDocument();
  });

  test("calls onSearchChange when the input value changes", () => {
    render(<Search searchTerm="" onSearchChange={mockOnSearchChange} />);
    const inputElement = screen.getByPlaceholderText(/search by name/i);
    fireEvent.change(inputElement, { target: { value: "new value" } });
    expect(mockOnSearchChange).toHaveBeenCalledWith("new value");
  });

  test("does not call onSearchChange when the input value is the same", () => {
    render(
      <Search searchTerm="same value" onSearchChange={mockOnSearchChange} />
    );
    const inputElement = screen.getByDisplayValue(/same value/i);
    fireEvent.change(inputElement, { target: { value: "same value" } });
    expect(mockOnSearchChange).not.toHaveBeenCalled();
  });
});
