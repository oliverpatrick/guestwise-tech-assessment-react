import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import * as React from "react";
import { ErrorBoundary } from "react-error-boundary";

import Loading from "../components/ui/loading/Loading";
import MainErrorFallback from "../components/errors/main-error";
import { queryConfig } from "../lib/react-query";

type AppProviderProps = {
  children: React.ReactNode;
};

/**
 * App provider component
 *
 * @description This component will handle error fallback, suspense and query client provider
 * @param {AppProviderProps} param0
 * @param {React.ReactNode} param0.children
 * @returns {*}
 */
export const AppProvider: React.FC<AppProviderProps> = ({
  children,
}: AppProviderProps) => {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: queryConfig,
      })
  );

  return (
    <React.Suspense fallback={<Loading spinner />}>
      <ErrorBoundary FallbackComponent={MainErrorFallback}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </ErrorBoundary>
    </React.Suspense>
  );
};
