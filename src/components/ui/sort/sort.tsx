import React, { memo } from "react";
import { Form, Col } from "react-bootstrap";
import { SortOption } from "../../../hooks/use-sort-and-filter";

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
        value={selectedSortOptions}
      >
        <option>No Filter</option>
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
