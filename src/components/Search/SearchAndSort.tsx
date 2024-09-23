import React from "react";
import { Form, Row, Col, FormGroup } from "react-bootstrap";

type SearchAndSortProps = {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  selectedSortOptions: string[];
  onSortChange: (option: string) => void;
};

/**
 * SearchAndSort component
 *
 * @param {SearchAndSortProps} props
 * @param {*} searchTerm
 * @param {*} onSearchChange
 * @param {*} selectedSortOptions
 * @param {*} onSortChange
 * @returns {*}
 */
const SearchAndSort: React.FC<SearchAndSortProps> = ({
  searchTerm,
  onSearchChange,
  selectedSortOptions,
  onSortChange,
}) => {
  const sortOptions = [
    { label: "Alphabetical", value: "alphabetical" },
    { label: "Rating", value: "rating" },
  ];

  return (
    <Row className="mb-4">
      <Col md={6}>
        <Form.Control
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </Col>
      <Col md={6}>
        <FormGroup>
          {sortOptions.map((sortOption) => (
            <Form.Check
              type="checkbox"
              label={sortOption.label}
              id={`sort-${sortOption.value}`}
              key={sortOption.value}
              checked={selectedSortOptions.includes(sortOption.value)}
              onChange={() => onSortChange(sortOption.value)}
            />
          ))}
        </FormGroup>
      </Col>
    </Row>
  );
};

export default SearchAndSort;
