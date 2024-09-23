import React from "react";
import { Container, Spinner } from "react-bootstrap";

type LoadingProps = {
  spinner?: boolean;
  shadow?: boolean;
};

/**
 * Loading component
 *
 * @param {LoadingProps} props
 * @param {boolean} props.spinner - Show spinner flag
 * @param {boolean} props.shadow - Show shadow flag
 * @returns {*}
 */
const Loading: React.FC<LoadingProps> = ({ spinner, shadow }: LoadingProps) => {
  if (shadow) {
    return (
      <Container>
        {/* <Shadow><span className="visually-hidden">Loading...</span></Shadow> */}
      </Container>
    );
  }

  if (spinner) {
    return (
      <Container>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  return (
    <Container>
      <h1>Loading...</h1>
    </Container>
  );
};

export default Loading;
