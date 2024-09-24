import React from "react";
import { Form, Col, FormGroup } from "react-bootstrap";

type SortProps = {
  selectedSortOptions: string[];
  onSortChange: (option: string) => void;
};

/**
 * Sort component
 *
 * @param {SortProps} props
 * @param {*} selectedSortOptions
 * @param {*} onSortChange
 * @returns {*}
 */
const SearchAndSort: React.FC<SortProps> = ({
  selectedSortOptions,
  onSortChange,
}) => {
  const sortOptions = [
    { label: "Alphabetical", value: "alphabetical" },
    { label: "Rating", value: "rating" },
  ];

  return (
    <Col md={6}>
      <Form.Select
        onChange={(e) => onSortChange(e.target.value)}
        value={selectedSortOptions[0] || ""}
        defaultValue={""}
      >
        <option>Sort By</option>
        {sortOptions.map((sortOption) => (
          <option key={sortOption.value} value={sortOption.value}>
            {sortOption.label}
          </option>
        ))}
      </Form.Select>
    </Col>
  );
};

export default SearchAndSort;
