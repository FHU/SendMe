import { Link, Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

import { QraftContext, requestFn } from "@openapi-qraft/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import styled from "styled-components";
import { useMemo } from "react";

const AppBar = styled.div`
  background: #2E8B57;
  padding: var(--sl-spacing-large);
  color: var(--sl-color-neutral-0);
  box-shadow: var(--sl-shadow-x-large);
`;

const ContentArea = styled.main`
  width: 600px;
  margin: var(--sl-spacing-4x-large) auto;
`;

// Custom Not Found Component
const NotFound = () => (
  <div style={{ textAlign: "center", marginTop: "50px", color: "#2E8B57" }}>
    <h2>Page Not Found</h2>
    <p>The page you're looking for doesn't exist.</p>
    <Link to="/" style={{ color: "#2E8B57", textDecoration: "underline" }}>
      Go Back Home
    </Link>
  </div>
);

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
			<AppBar>Send Me!</AppBar>
			<ContentArea>
				<Outlet />
			</ContentArea>
			<TanStackRouterDevtools />
		</Providers>
	),
	notFoundComponent: NotFound, // Corrected Property Name
});
