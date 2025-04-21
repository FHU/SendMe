import api from "@sendme/api";
import { SlSpinner } from "@shoelace-style/shoelace/dist/react";
import { createFileRoute } from "@tanstack/react-router";
import styled from "styled-components";
import { CreateOpportunity } from "./-components/CreateOpportunity";

export const Route = createFileRoute("/oppertunities/create/")({
	component: RouteComponent,
});

const AreaHeading = styled.h2``;

function RouteComponent() {
	const { data: orgs, refetch: refetchOrg } =
		api.organizations.listOrganizations.useQuery();
	const { data, refetch } = api.opportunities.listOpportunities.useQuery();
	return (
		<>
			<CreateOpportunity onCreated={refetch} />
		</>
	);
}
