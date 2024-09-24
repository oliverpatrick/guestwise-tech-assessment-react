import React from "react";
import { Container } from "react-bootstrap";

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
  return <Container>{errorMessage}</Container>;
};

export default ErrorFallback;
