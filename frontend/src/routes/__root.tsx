import { Link, Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

import { QraftContext, requestFn } from "@openapi-qraft/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import styled from "styled-components";

import { useMemo } from "react";
import Footer from "./-components/footer";
import Navbar from "./-components/navbar";

const ContentArea = styled.main`
    display: flex;
	justify-content: center;
	z-index: 1;
	position: relative;
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
			<ContentArea>
				<Outlet />
			</ContentArea>
			<Footer />
			<TanStackRouterDevtools />
		</Providers>
	),
});
