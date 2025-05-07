import { createFileRoute } from "@tanstack/react-router";
import Header from "../-components/header";
import ProtectRoute from "../-preloaders/ProtectRoute";
import Background from "./-components/background";

export const Route = createFileRoute("/profile/")({
	component: RouteComponent,
	beforeLoad: ProtectRoute,
});

function RouteComponent() {
	return (
		<div
			style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
		>
			<Header showAddBtn={false} />
			<Background />
		</div>
	);
}
