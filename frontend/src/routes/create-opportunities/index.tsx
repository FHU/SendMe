import api from "@sendme/api";
import { createFileRoute } from "@tanstack/react-router";
import Header from "../-components/header";
import ProtectRoute from "../-preloaders/ProtectRoute";
import { CreateOpportunity } from "./-components/CreateOpportunity";

export const Route = createFileRoute("/create-opportunities/")({
	component: RouteComponent,
	beforeLoad: ProtectRoute,
});

function RouteComponent() {
	const { data: orgs, refetch: refetchOrg } =
		api.organizations.listOrganizations.useQuery();
	const { data, refetch } = api.opportunities.listOpportunities.useQuery();
	return (
		<div
			style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
		>
			<Header showAddBtn={true} />
			<CreateOpportunity onCreated={refetch} />
		</div>
	);
}
