import api from "@sendme/api";
import { SlSpinner } from "@shoelace-style/shoelace/dist/react";
import { createFileRoute } from "@tanstack/react-router";
import styled from "styled-components";
import { CreateOpportunity } from "./-components/CreateOpportunity";
import { OpportunitiesList } from "./-components/OpportunitiesList";

export const Route = createFileRoute("/opportunities/")({
	component: RouteComponent,
});

const AreaHeading = styled.h2``;

function RouteComponent() {
	const { orgs, refetchOrg } = api.organizations.list_organizations.useQuery();
	const { data, refetch } = api.opportunities.list_opportunities.useQuery();
	return (
		<>
			<CreateOpportunity onCreated={refetch} />
			<AreaHeading>Opportunities</AreaHeading>
			{!data ? <SlSpinner /> : <OpportunitiesList data={data} />}
		</>
	);
}
