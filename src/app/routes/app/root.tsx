import { lazy, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { Container } from "react-bootstrap";
import Loading from "../../../components/ui/loading/Loading";
import ErrorFallback from "../../../components/errors/error";

const HomeRoute = lazy(() => import("./home"));

/**
 * App Root component
 *
 * @description This component will handle error boundary and suspense if there was a routing system
 * @returns {*}
 */
export const AppRoot = () => {
  return (
    <Container>
      {/* container would be a layout component if I had one */}
      <Suspense fallback={<Loading spinner />}>
        <ErrorBoundary
          fallback={<ErrorFallback errorMessage="Something went wrong!" />}
        >
          <HomeRoute />
        </ErrorBoundary>
      </Suspense>
    </Container>
  );
};
