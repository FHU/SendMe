import { createFileRoute } from "@tanstack/react-router";
import Background from "./-components/background";
import Header from "./-components/header";

export const Route = createFileRoute("/profile/")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div
			style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
		>
			<Header />
			<Background />
		</div>
	);
}
