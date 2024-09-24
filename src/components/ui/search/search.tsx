import React from "react";
import { Form, Col } from "react-bootstrap";

type SearchProps = {
  searchTerm: string;
  onSearchChange: (term: string) => void;
};

/**
 * SearchAndSort component
 *
 * @param {SearchProps} props
 * @param {*} searchTerm
 * @param {*} onSearchChange
 * @returns {*}
 */
const Search: React.FC<SearchProps> = ({ searchTerm, onSearchChange }) => {
  return (
    <Col md={6}>
      <Form.Control
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </Col>
  );
};

export default Search;
