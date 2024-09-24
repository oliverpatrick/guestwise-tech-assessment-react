import React from "react";
import { Button, Container } from "react-bootstrap";

/**
 * Main Error component
 *
 * @returns {*}
 */
const MainErrorFallback = () => {
  return (
    <Container>
      <h2>Oops, soemthing went wrong!</h2>
      <Button className="mt-4" onClick={() => window.location.reload()}>
        Refresh
      </Button>
    </Container>
  );
};

export default MainErrorFallback;
