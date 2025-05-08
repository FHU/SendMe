import { createFileRoute } from "@tanstack/react-router";
import ProtectRoute from "../-preloaders/ProtectRoute";
import { CreateOrganizationForm } from "./-components/CreateOrganizationForm";

export const Route = createFileRoute("/organizations/")({
	component: RouteComponent,
	// beforeLoad: ProtectRoute,
});

function RouteComponent() {
	return (
		<div style={{ maxWidth: "600px", margin: "2rem auto" }}>
			<CreateOrganizationForm />
		</div>
	);
}
