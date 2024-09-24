import React from "react";
import { Button, Col, Container } from "react-bootstrap";

type ErrorProps = {
  errorMessage: string;
};

/**
 * Error component
 *
 * @param {ErrorProps} props - Component props
 * @param {string} errorMessage - Error message string
 * @returns {*}
 */
const ErrorFallback: React.FC<ErrorProps> = ({ errorMessage }: ErrorProps) => {
  return (
    <Container>
      <Col>{errorMessage}</Col>
      <Button className="mt-4" onClick={() => window.location.reload()}>
        Refresh
      </Button>
    </Container>
  );
};

export default ErrorFallback;
