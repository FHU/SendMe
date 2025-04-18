import api from "@sendme/api";
import { SlSpinner } from "@shoelace-style/shoelace/dist/react";
import { createFileRoute } from "@tanstack/react-router";
import styled from "styled-components";
import ProtectRoute from "../-preloaders/ProtectRoute";
import { CreateOpportunity } from "./-components/CreateOpportunity";
import { OpportunitiesList } from "./-components/OpportunitiesList";

export const Route = createFileRoute("/opportunities/")({
	component: RouteComponent,
	beforeLoad: ProtectRoute,
});

const AreaHeading = styled.h2``;

function RouteComponent() {
	const { data: orgs, refetch: refetchOrg } =
		api.organizations.listOrganizations.useQuery();
	const { data, refetch } = api.opportunities.listOpportunities.useQuery();
	return (
		<>
			<CreateOpportunity onCreated={refetch} />
			<AreaHeading>Opportunities</AreaHeading>
			{!data ? <SlSpinner /> : <OpportunitiesList data={data} />}
		</>
	);
}
