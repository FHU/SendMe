import { createFileRoute } from "@tanstack/react-router";
import Background from "./-components/background";

export const Route = createFileRoute("/home/")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div style={{ display: "flex", justifyContent: "center" }}>
			<Background />
		</div>
	);
}
