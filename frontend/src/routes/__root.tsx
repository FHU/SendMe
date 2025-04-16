import { Link, Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

import { QraftContext, requestFn } from "@openapi-qraft/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import styled from "styled-components";

import { useMemo } from "react";
import Footer from "./-components/footer";
import Header from "./-components/header";
import Navbar from "./-components/navbar";

const ContentArea = styled.main`
  width: 600px;
  margin: var(--sl-spacing-4x-large) auto;
`;

const HeaderDetails = styled.div`
	display: flex;
	justify-content: center;
	border-bottom-left-radius: 5rem;
	border-top-right-radius: 5rem;
`;

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
			<Navbar appName="SendMe" />
			<HeaderDetails>
				<Header />
			</HeaderDetails>
			<ContentArea>
				<Outlet />
			</ContentArea>
			<Footer />
			<TanStackRouterDevtools />
		</Providers>
	),
});
