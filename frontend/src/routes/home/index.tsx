import api from "@sendme/api";
import { createFileRoute } from "@tanstack/react-router";
import styled from "styled-components";
import ProtectRoute from "../-preloaders/ProtectRoute";
import Background from "./-components/background";
import { CreateOpportunity } from "./-components/create-opportunities/CreateOpportunity";

export const Route = createFileRoute("/home/")({
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
			<Background />
			<CreateOpportunity onCreated={refetch} />
		</div>
	);
}
