import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

import { QraftContext, requestFn } from "@openapi-qraft/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { useMemo } from "react";

function Providers({ children }: { children: JSX.Element[] }) {
  const queryClient = useMemo(() => new QueryClient(), []);

  return (
    <QueryClientProvider client={queryClient}>
      <QraftContext.Provider
        value={{
          baseUrl: "/api", // base URL for all requests
          requestFn, // `requestFn(...)` will be invoked for every request
        }}
      >
        {children}
      </QraftContext.Provider>
    </QueryClientProvider>
  );
}

export const Route = createRootRoute({
  component: () => (
    <Providers>
      <div>Header</div>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </Providers>
  ),
});
