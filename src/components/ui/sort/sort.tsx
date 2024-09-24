import React, { memo } from "react";
import { Form, Col } from "react-bootstrap";
import { SortOption } from "../../../hooks/useSortAndFilter";

type SortProps = {
  sortOptions: SortOption[];
  selectedSortOptions: string;
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
const Sort: React.FC<SortProps> = ({
  sortOptions,
  selectedSortOptions,
  onSortChange,
}) => {
  return (
    <Col md={6}>
      <Form.Select
        onChange={(e) => onSortChange(e.target.value)}
        value={selectedSortOptions[0] || ""}
      >
        <option>Sort By</option>
        {sortOptions.map((sortOption) => (
          <option
            key={sortOption.value as string}
            value={sortOption.value as string}
          >
            {sortOption.label}
          </option>
        ))}
      </Form.Select>
    </Col>
  );
};

export default memo(Sort);
